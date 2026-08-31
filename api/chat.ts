import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSystemInstruction } from '../src/lib/ai-prompt';

// Helper to race a promise against a timeout
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timeoutId: any;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error("TimeoutError"));
    }, ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => {
    clearTimeout(timeoutId);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method Not Allowed' });
  }

  try {
    const { messages, userMessage, currentAge, dateStr } = req.body || {};

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(200).json({ status: 'error', message: 'GEMINI_API_KEY is not configured in Vercel environment variables.' });
    }

    const age = currentAge || 24;
    const todayStr = dateStr || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const systemPrompt = getSystemInstruction(todayStr, age);

    // Prioritize active, supported production models (gemini-3.6-flash, gemini-3.5-flash-lite, etc.)
    const modelsToTry = [
      "gemini-3.6-flash",
      "gemini-3.5-flash-lite",
      "gemini-3.7-flash",
      "gemini-3.1-flash-lite",
      "gemini-flash-latest"
    ];
    let reply = "";
    let lastError: any = null;

    // Construct the payload content array cleanly for API compatibility
    const contents = [
      ...(messages || []).map((m: any) => ({
        role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.content || '' }]
      })),
      { role: "user", parts: [{ text: userMessage || '' }] }
    ];

    const startTime = Date.now();

    // Try models with robust failover and timeout to handle high-demand spikes
    for (const model of modelsToTry) {
      if (Date.now() - startTime > 8000) {
        console.warn("Approaching Vercel timeout limit. Aborting further model fallbacks to allow graceful error exit.");
        break;
      }

      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        
        const response = await withTimeout(
          fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: contents,
              systemInstruction: {
                role: "user",
                parts: [{ text: systemPrompt }]
              },
              generationConfig: {
                temperature: 0.4
              }
            })
          }),
          7000 // 7 seconds per attempt to stay safely under Vercel's 10s limit
        );

        if (!response.ok) {
           const errorText = await response.text();
           throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        
        const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (textResult && textResult.trim().length > 0) {
          reply = textResult;
          break; // Success!
        } else {
          throw new Error("Empty response returned from model.");
        }
      } catch (err: any) {
        console.warn(`Model ${model} unavailable (attempting next fallback):`, err.message);
        lastError = err;
        // If high demand (503 / 429), brief pause before next model
        if (err.message?.includes('503') || err.message?.includes('429') || err.message?.includes('UNAVAILABLE')) {
          await new Promise((resolve) => setTimeout(resolve, 300));
        }
      }
    }

    if (!reply) {
      throw lastError || new Error("All model fallback options failed.");
    }

    return res.status(200).json({ status: 'ok', reply });
  } catch (error: any) {
    console.error('SERVERLESS GEMINI ERROR:', error);
    return res.status(200).json({ status: 'error', message: error.message || 'An unknown error occurred.' });
  }
}

