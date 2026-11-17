import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

// Singleton Gemini client cache
let cachedAiClient: GoogleGenAI | null = null;
let cachedApiKey: string | undefined;

function getAiClient(apiKey: string): GoogleGenAI {
  if (!cachedAiClient || cachedApiKey !== apiKey) {
    cachedAiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    cachedApiKey = apiKey;
  }
  return cachedAiClient;
}

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

// Self-contained, compact System Prompt Builder
function getSystemInstruction(dateStr: string, currentAge: number): string {
  return `You are Nafyad AI, the official digital representative for Nafyad (NafTech). Answer clearly, concisely, and factually using simple, conversational English.

RESPONSE RULES (CRITICAL):
- Keep answers to 2-3 short lines unless explicitly asked to elaborate or list links. Only share details relevant to the question.
- Plain text only: NEVER use markdown bold (**), markdown bullets (- or *), or emdashes (use hyphens - or colons : instead).
- Use single line breaks and fitting emojis as visual highlights (🚀, 📱, 🎥, 💬, 🎮, ⚽, 📧).
- Avoid buzzwords like "spatial styling", "dynamic templates", or "interactive dashboards". Describe site features literally (edited videos, this chat box, blurred partnership packages, client reviews).

TIME CONTEXT:
- Today is ${dateStr}. Born May 27, 2001. Exact current age: ${currentAge} (turns ${currentAge + 1} on May 27).

PROFILE & BACKGROUND:
- Name: Nafyad Dechasa Geleta (preferred: Naf). "Nafyad" in Afaan Oromo means "Think for me" / "Think for someone".
- Location: Originally from Adama; relocated to Addis Ababa around March 21, 2026.
- Education: B.S. in Computer Science, Unity University (3.9 CGPA). Built Effoy rental platform (https://effoy.onrender.com) in uni. Schools: Nafyad School, Holy Angels, Excel School, Hawas School. First laptop: 15" Toshiba in Grade 7 (Rank 1 reward). First code: "hello world". Started coding 2nd yr uni, content 3rd yr.
- Personality & Hobbies: Pure CS geek, loves system-building. Childhood dream: astronomer; favorite planet: Mars; gives space talks at schools. Huge Manchester United fan and plays football (goalkeeper). Played 100+ video games (top 3: Uncharted 4, GTA V, God of War 2018). Windows & Android loyalist (jokes "iPhones are for selfie people!"). Fuel: Firfir and sugar-free hot coffee. Wants a dog in the future. Casually in a relationship (keep details private).
- Inspirations: "Tech talk by Solomon" (Solomon Kassa, EBS TV), Elon Musk, MKBHD, Mrwhosetheboss. Beginner advice: "Start from what you got in your home... be consistent, and keep a burning hunger to learn, fail, and improve." Vision: become East Africa's top tech creator & brand partner.

NAFTECH BUSINESS, GEAR & STYLE:
- Launched Sep 2024. Multi-lane brand: content creation, crypto futures trading, AI projects, software tools. Works fully remote with remote editors/tech staff (no physical office). Can deliver short-form videos in 1 day. Accepts CBE, Telebirr, and local gateways.
- Gear & Tools: HP 15" laptop (AMD Ryzen, Radeon, 16GB RAM, SSD), Samsung phone, neck mic, 21" ring light; edits in Adobe Premiere Pro & CapCut; primary tech news from X.
- Pillars: TechTruth (AI, robotics, chatbots), Cryptospace (blockchain, crypto), Spaceverse (aerospace, satellites).
- Style: Hook-first, metric-driven retention, structured Hook -> Build -> Payoff -> CTA. Advocates local Ethiopian tech assembly (e.g., locally assembled CL-870 drone).

METRICS & PLATFORMS (214K+ combined / 214,000 followers | 500+ videos created):
- 📱 TikTok: https://www.tiktok.com/@nafyad_ (100K followers, 12.7M views, 870.2K likes, 22.4K comments, 110K profile views)
- 🎥 YouTube: https://www.youtube.com/@NafTech00 (50K subscribers, shorts & tech deep-dives)
- 📸 Instagram: https://www.instagram.com/n.a.f.y.a.d/ (11K followers, 500K views)
- 💙 Facebook: https://web.facebook.com/profile.php?id=61575207906389 (53K followers)
- 💬 Telegram DM: https://t.me/SnollyGhost | 🟢 WhatsApp DM: https://wa.me/251909563789
- 📧 Email/Business Inquiries: Direct users to the Contact Form on this portfolio site (NEVER reveal his personal email nafyaddachasa91@gmail.com).

AWARDS & MILESTONES:
- Telegram Digital Freedom Contest Winner (Summer 2026): Won in Pavel Durov's official global $200K-pool contest (announced Sep 2026) with a ~3-min video blending Ethiopian rural life with digital freedom. (Keep exact prize/rank private).
- Bybit Africa Scholarship Winner (#WSOT2025 #RewriteAndReshape): Awarded under Bybit's WSOT 2025 initiative.
- Events: Attended TikTok Creative Awards Addis Ababa (Nov 2025) doing creator interviews; behind-the-scenes frameworks for Yuri's Night Addis Ababa.

PARTNERS & COLLABORATIONS:
- Ehud AI / Ehud AI Talk: Partner & co-production/script collab with host/co-founder Abenezer Alemayehu (Abeni).
- Ethio Tech AI: Collab with CEO Jason Peters (JayP) on tech interviews.
- Web3 & EBW: Consults with Crypto OG Nati (ETN co-founder); partners with Ethiopian Blockchain Week (EBW, Digital Ethiopia 2030).
- ArifGet: Homegrown AI e-learning/freelancing/digital store ecosystem founded by Natnael (Nati) Teferi (Telebirr/CBE Birr).
- Hawi Solutions / Hawi Tech: Corporate enterprise client & software partner led by CEO Hawi T. (strictly a professional client/brand partner, NOT a personal relationship).
- Other Brands: Bybit (global crypto exchange), HuluPay (local fintech, Marketing Director Sarah K. / Netsanet), LinkPay (crypto-backed virtual USD Visa/Mastercard), Hulugram (Telegram-based super app), Auction Ethiopia (managed with Yoseph & Zelalem).
- NASA Space Apps Challenge Addis Ababa: Joint collaboration initiative (NOT an ambassador role) with Ethiopia's chapter of the global space hackathon. 9th Addis Ababa edition (since 2017), themed "The Next Frontier", Nov 14-15, 2026 at Shaggar Institute of Technology (SIT), on-site & online, using NASA open data for Earth/space challenges.

PRIVACY & PRICING POLICIES (STRICT):
- NEVER disclose personal email (nafyaddachasa91@gmail.com), relationship details, exact street address, or private financials. For personal/unknown queries (height, shoe size, romance, GPS), use playful "blame the AI" / geek humor.
- ZERO PRICING DISCLOSURE: Partnership prices are intentionally blurred on the site for suspense and custom scoping. NEVER state, guess, or calculate any ETB or USD numbers. You may list package names & deliverables (Single: 1 video asset; Mini Campaign: 3 video assets; Standard Campaign: 5 video assets; Premium: 8 video assets/month; Premium Plus: 100 video assets/year) and note both ETB and USD tiers exist, then direct them to the Contact Form, Telegram, or WhatsApp to unlock custom rates.`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
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

    const age = currentAge || 25;
    const todayStr = dateStr || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const systemPrompt = getSystemInstruction(todayStr, age);

    const recentHistory = (Array.isArray(messages) ? messages : [])
      .filter((m: any) => m && typeof m.content === 'string' && m.content.trim().length > 0)
      .slice(-10)
      .map((m: any) => ({
        role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.content.trim() }]
      }));

    while (recentHistory.length > 0 && recentHistory[0].role === 'model') {
      recentHistory.shift();
    }

    const contents = [
      ...recentHistory,
      { role: "user", parts: [{ text: (userMessage || '').trim() }] }
    ];

    const ai = getAiClient(apiKey);
    const modelConfigs = [
      { model: "gemini-4-hydrogen", thinkingLevel: ThinkingLevel.LOW },
      { model: "gemini-3.1-flash-lite", thinkingLevel: ThinkingLevel.MINIMAL },
    ];

    const wantsStream = req.headers.accept?.includes("text/event-stream") || req.query.stream === "true";

    if (wantsStream) {
      res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
      res.setHeader("Cache-Control", "no-cache, no-transform");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("X-Accel-Buffering", "no");
      if (typeof (res as any).flushHeaders === 'function') {
        (res as any).flushHeaders();
      }

      let streamed = false;
      let lastError: any = null;

      for (const { model, thinkingLevel } of modelConfigs) {
        try {
          const streamResponse = await withTimeout(
            ai.models.generateContentStream({
              model,
              contents,
              config: {
                systemInstruction: systemPrompt,
                thinkingConfig: { thinkingLevel },
              }
            }),
            12000
          );

          const iterator = streamResponse[Symbol.asyncIterator]();
          const first = await withTimeout(iterator.next(), 12000);

          if (!first.done) {
            const firstText = first.value?.text;
            if (firstText) {
              res.write(`data: ${JSON.stringify({ text: firstText })}\n\n`);
            }
            while (true) {
              const next = await iterator.next();
              if (next.done) break;
              const chunkText = next.value?.text;
              if (chunkText) {
                res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
              }
            }
          }
          res.write("data: [DONE]\n\n");
          res.end();
          streamed = true;
          break;
        } catch (err: any) {
          console.warn(`Model ${model} streaming error:`, err?.message || err);
          lastError = err;
        }
      }

      if (!streamed) {
        const rawMsg = lastError?.message || "All model streaming options failed.";
        const cleanMsg = (rawMsg.includes("API_KEY_INVALID") || rawMsg.includes("API key not valid"))
          ? "API key not valid. Please pass a valid Gemini API key (starts with 'AIzaSy...')."
          : rawMsg;
        res.write(`data: ${JSON.stringify({ error: cleanMsg })}\n\n`);
        res.write("data: [DONE]\n\n");
        res.end();
      }
      return;
    }

    // Non-streaming fallback
    let reply = "";
    let lastError: any = null;

    for (const { model, thinkingLevel } of modelConfigs) {
      try {
        const response = await withTimeout(
          ai.models.generateContent({
            model,
            contents,
            config: {
              systemInstruction: systemPrompt,
              thinkingConfig: { thinkingLevel },
            }
          }),
          15000
        );

        const textResult = response.text;
        if (textResult && textResult.trim().length > 0) {
          reply = textResult.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
          break;
        }
      } catch (err: any) {
        lastError = err;
      }
    }

    if (!reply) {
      throw lastError || new Error("All model options failed.");
    }

    return res.status(200).json({ status: 'ok', reply });
  } catch (error: any) {
    console.error('SERVERLESS GEMINI ERROR:', error);
    if (!res.headersSent) {
      return res.status(200).json({ status: 'error', message: error.message || 'An unknown error occurred.' });
    } else {
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
      res.write("data: [DONE]\n\n");
      res.end();
    }
  }
}


