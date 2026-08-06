import type { VercelRequest, VercelResponse } from '@vercel/node';
import { pdf } from '@react-pdf/renderer';
import React from 'react';
import { CVPDFDoc } from '../src/components/CVPDFDoc';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const doc = React.createElement(CVPDFDoc);
    const buffer = await pdf(doc).toBuffer();
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=Naftech_Nafyad_Dachasa_CV.pdf');
    res.status(200).send(buffer);
  } catch (error: any) {
    console.error('CV PDF compilation error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
}
