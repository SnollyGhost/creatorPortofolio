import type { VercelRequest, VercelResponse } from '@vercel/node';
import { pdf } from '@react-pdf/renderer';
import React from 'react';
import { MediaKitPDFDoc } from '../src/components/MediaKitPDFDoc';
import fs from 'fs';
import path from 'path';

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const images = {
      creatorImg: getBase64Image('src/assets/creator.webp'),
      bybit: getBase64Image('src/assets/bybit.webp'),
      ehudAi: getBase64Image('src/assets/EhudAI.webp'),
      huluPay: getBase64Image('src/assets/huluPay.webp'),
      hawi: getBase64Image('src/assets/hawi.webp'),
      auctionEthiopia: getBase64Image('src/assets/auction_ethiopia.svg'),
    };

    const doc = React.createElement(MediaKitPDFDoc, { images }) as any;
    const buffer = await pdf(doc).toBuffer();
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=NafTech_Creator_Portfolio.pdf');
    res.status(200).send(buffer);
  } catch (error: any) {
    console.error('Portfolio PDF compilation error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
}
