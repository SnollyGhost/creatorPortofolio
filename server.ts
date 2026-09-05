import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { getSystemInstruction } from "./src/lib/ai-prompt";
import { GoogleGenAI } from "@google/genai";

// Try to load .env in development
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
app.use(express.json());

// Redirect legacy domains (nafyad.vercel.app, naftech.vercel.app) to primary domain nafyad.tech
app.use((req, res, next) => {
  const host = req.headers.host;
  if (host && (host.includes('nafyad.vercel.app') || host.includes('naftech.vercel.app'))) {
    return res.redirect(301, `https://www.nafyad.tech${req.originalUrl}`);
  }
  next();
});

// Transporter cache
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  const user = (process.env.SMTP_USER || 'nafyaddachasa91@gmail.com').trim();
  const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');

  if (!transporter && pass) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
  }
  return { transporter, user, pass };
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

// Chatbot API Endpoint (Secure server-side proxy with real-time SSE streaming)
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, userMessage, currentAge, dateStr } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({ status: "error", message: "GEMINI_API_KEY is not configured in local environment variables." });
    }

    const systemPrompt = getSystemInstruction(dateStr, currentAge);
    const contents = [
      ...(messages || []).map((m: any) => ({
        role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.content || '' }]
      })),
      { role: "user", parts: [{ text: userMessage || '' }] }
    ];

    const wantsStream = req.headers.accept?.includes("text/event-stream") || req.query.stream === "true";

    if (wantsStream) {
      res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
      res.setHeader("Cache-Control", "no-cache, no-transform");
      res.setHeader("Connection", "keep-alive");
      res.flushHeaders?.();

      const ai = new GoogleGenAI({ apiKey });
      const modelsToTry = [
        "gemini-3.8-flash",
        "gemini-3.1-flash-lite",
        "gemini-flash-latest"
      ];

      let streamed = false;
      let lastError: any = null;

      for (const model of modelsToTry) {
        try {
          const streamResponse = await ai.models.generateContentStream({
            model,
            contents: contents.map(c => ({
              role: c.role,
              parts: c.parts.map(p => ({ text: p.text }))
            })),
            config: {
              systemInstruction: systemPrompt,
              temperature: 0.4
            }
          });

          for await (const chunk of streamResponse) {
            const chunkText = chunk.text;
            if (chunkText) {
              res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
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
        res.write(`data: ${JSON.stringify({ error: lastError?.message || "All model streaming options failed." })}\n\n`);
        res.write("data: [DONE]\n\n");
        res.end();
      }
      return;
    }

    // Non-streaming fallback
    const ai = new GoogleGenAI({ apiKey });
    const modelsToTry = [
      "gemini-3.8-flash",
      "gemini-3.1-flash-lite",
      "gemini-flash-latest"
    ];
    let reply = "";
    let lastError: any = null;

    for (const model of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: contents.map(c => ({
            role: c.role,
            parts: c.parts.map(p => ({ text: p.text }))
          })),
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.4
          }
        });

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
      throw lastError || new Error("All model fallback options failed.");
    }

    return res.json({ status: "ok", reply });
  } catch (error: any) {
    console.error("Gemini API local server error:", error);
    if (!res.headersSent) {
      return res.status(200).json({ status: "error", message: error.message || 'An unknown error occurred.' });
    } else {
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
      res.write("data: [DONE]\n\n");
      res.end();
    }
  }
});

// Health Check (Local/Preview)
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    environment: {
      userSet: !!process.env.SMTP_USER,
      passSet: !!process.env.SMTP_PASS,
      isLocal: !process.env.VERCEL
    }
  });
});

function escapeHtml(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Notify endpoint (Local/Preview)
app.post("/api/notify", async (req, res) => {
  try {
    const name = escapeHtml(req.body.name || '');
    const email = escapeHtml(req.body.email || '');
    const phone = escapeHtml(req.body.phone || '');
    const company = escapeHtml(req.body.company || '');
    const pkg = escapeHtml(req.body.package || '');
    const message = escapeHtml(req.body.message || '');
    
    const { transporter, user, pass } = getTransporter();

    if (!pass) {
      return res.status(500).json({ status: "error", message: "SMTP_PASS missing" });
    }

    if (!transporter) {
      return res.status(500).json({ status: "error", message: "Transporter init failed" });
    }

    const mailOptions = {
      from: `"NafTech Local" <${user}>`,
      to: "nafyaddachasa91@gmail.com",
      subject: `⚡️ Local Brief from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPackage: ${pkg}\nMessage: ${message}`,
      html: `<h3>Local Brief</h3><p><strong>From:</strong> ${name} (${email})</p><p><strong>Project:</strong> ${pkg}</p><p><strong>Message:</strong> ${message}</p>`
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ status: "ok" });
  } catch (error: any) {
    console.error("Local notify error:", error);
    return res.status(500).json({ status: "error", error: error.message });
  }
});

const PORT = 3000;

async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    // Local dev/preview with Vite
    try {
      const { createServer } = await import("vite");
      const vite = await createServer({
        server: { middlewareMode: true },
        appType: "spa"
      });
      app.use(vite.middlewares);
    } catch (e) {
      console.error("Failed to start Vite middleware:", e);
    }
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), "dist");
    
    // Explicitly serve static assets from public and src/assets for rock-solid reliability on page refresh
    app.use(express.static(path.join(process.cwd(), "public")));
    app.use("/assets", express.static(path.join(process.cwd(), "src/assets")));
    app.use("/src/assets", express.static(path.join(process.cwd(), "src/assets")));
    app.use("/covers", express.static(path.join(process.cwd(), "src/assets/covers")));
    app.use("/src/assets/covers", express.static(path.join(process.cwd(), "src/assets/covers")));
    
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

bootstrap();

export default app;
