import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import React from "react";
import { renderToStream } from "@react-pdf/renderer";
import { MediaKitPDFDoc } from "./src/components/MediaKitPDFDoc";
import { CVPDFDoc } from "./src/components/CVPDFDoc";
import { getSystemInstruction } from "./src/lib/ai-prompt";

// Helper to convert images to Base64 safely
const getBase64Image = (assetRelativePath: string) => {
  try {
    const fullPath = path.join(process.cwd(), assetRelativePath);
    if (fs.existsSync(fullPath)) {
      const bitmap = fs.readFileSync(fullPath);
      const ext = path.extname(fullPath).toLowerCase().substring(1);
      const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : ext === 'svg' ? 'image/svg+xml' : `image/${ext}`;
      return `data:${mime};base64,${bitmap.toString('base64')}`;
    }
  } catch (error) {
    console.error(`Error reading ${assetRelativePath}:`, error);
  }
  return undefined;
};

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

// Chatbot API Endpoint (Secure server-side proxy)
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, userMessage, currentAge, dateStr } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({ status: "error", message: "GEMINI_API_KEY is not configured in local environment variables." });
    }

    const systemPrompt = getSystemInstruction(dateStr, currentAge);

    // Active supported production Gemini models (Fastest first to prevent timeouts)
    const modelsToTry = [
      "gemini-3.5-flash-lite",
      "gemini-3.7-flash",
      "gemini-flash-latest",
      "gemini-3.1-flash-lite",
      "gemini-3.1-pro-preview"
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
      if (Date.now() - startTime > 15000) {
        console.warn("Approaching timeout limit. Aborting further model fallbacks to allow graceful error exit.");
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
          9000 // 9 seconds per attempt for local server
        );

        if (!response.ok) {
           const errorText = await response.text();
           throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        
        const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (textResult && textResult.trim().length > 0) {
          // Normalize line breaks to at most 1 single blank line, removing excessive vertical gaps
          reply = textResult.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
          break; // Success!
        } else {
          throw new Error("Empty response returned from model.");
        }
      } catch (err: any) {
        console.warn(`Model ${model} unavailable (attempting next fallback):`, err.message);
        lastError = err;
        if (err.message?.includes('503') || err.message?.includes('429') || err.message?.includes('UNAVAILABLE')) {
          await new Promise((resolve) => setTimeout(resolve, 300));
        }
      }
    }

    if (!reply) {
      throw lastError || new Error("All model fallback options failed.");
    }

    return res.json({ status: "ok", reply });
  } catch (error: any) {
    console.error("Gemini API local server error:", error);
    return res.status(200).json({ status: "error", message: error.message || 'An unknown error occurred.' });
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

// PDF Portfolio Generation
app.get("/api/portfolio.pdf", async (req, res) => {
  try {
    const images = {
      creatorImg: getBase64Image('src/assets/creator.webp'),
      bybit: getBase64Image('src/assets/bybit.webp'),
      ehudAi: getBase64Image('src/assets/EhudAI.webp'),
      huluPay: getBase64Image('src/assets/huluPay.webp'),
      hawi: getBase64Image('src/assets/hawi.webp'),
      auctionEthiopia: getBase64Image('src/assets/auction_ethiopia.svg'),
    };

    const stream = await renderToStream(React.createElement(MediaKitPDFDoc, { images }) as any);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=NafTech_Creator_Portfolio.pdf');
    
    stream.pipe(res);
  } catch (error: any) {
    console.error("PDF Generation error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Professional CV PDF Generation
app.get("/api/cv.pdf", async (req, res) => {
  try {
    const stream = await renderToStream(React.createElement(CVPDFDoc));
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=Nafyad_Dechasa_CV.pdf');
    
    stream.pipe(res);
  } catch (error: any) {
    console.error("CV PDF Generation error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
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
