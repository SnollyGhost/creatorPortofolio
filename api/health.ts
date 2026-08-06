import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    status: 'operational',
    timestamp: new Date().toISOString(),
    environment: {
      userSet: !!process.env.SMTP_USER,
      passSet: !!process.env.SMTP_PASS,
      isVercel: !!process.env.VERCEL,
      nodeVersion: process.version
    }
  });
}
