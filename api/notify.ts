import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

function escapeHtml(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Set CORS headers if needed, but here we just handle POST
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method Not Allowed' });
  }

  try {
    const name = escapeHtml(req.body.name || '');
    const email = escapeHtml(req.body.email || '');
    const phone = escapeHtml(req.body.phone || '');
    const company = escapeHtml(req.body.company || '');
    const pkg = escapeHtml(req.body.package || '');
    const message = escapeHtml(req.body.message || '');
    const preferredMethod = escapeHtml(req.body.preferredMethod || '');

    // 2. Identify credentials
    const SMTP_USER = (process.env.SMTP_USER || 'nafyaddachasa91@gmail.com').trim();
    const SMTP_PASS = (process.env.SMTP_PASS || '').replace(/\s+/g, '');

    if (!SMTP_PASS) {
      return res.status(500).json({ 
        status: 'error', 
        message: 'Server configuration missing (SMTP_PASS is not set in Vercel environment variables)' 
      });
    }

    // 3. Create Transporter (Fresh one for serverless)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // 4. Construct Email
    const mailOptions = {
      from: `"NafTech System" <${SMTP_USER}>`,
      to: 'nafyaddachasa91@gmail.com',
      replyTo: email,
      subject: `⚡️ [Vercel] New Brief from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMethod: ${preferredMethod}\nCompany: ${company}\nProject: ${pkg}\nMessage: ${message}`,
      html: `
        <div style="font-family: sans-serif; background: #030303; color: white; padding: 40px; border-radius: 20px;">
          <h2 style="color: #9333ea; font-size: 24px;">Mission Brief Received (Vercel)</h2>
          <hr style="border: 0; border-top: 1px solid #333; margin: 20px 0;" />
          <p><strong>Identity:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Channel:</strong> ${preferredMethod?.toUpperCase()}</p>
          <p><strong>Project:</strong> ${pkg}</p>
          <div style="background: #111; padding: 20px; border-radius: 10px; margin-top: 20px;">
            <p style="color: #666; font-size: 12px; margin: 0 0 10px 0;">BRIEF DETAILS:</p>
            <p style="margin: 0;">${message || 'No description provided.'}</p>
          </div>
        </div>
      `,
    };

    // 5. Send
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ status: 'ok', message: 'Inquiry transmitted successfully' });
  } catch (error: any) {
    console.error('SERVERLESS ERROR:', error);
    return res.status(500).json({ 
      status: 'error', 
      message: 'SMTP Transmission Failed', 
      details: error.message 
    });
  }
}
