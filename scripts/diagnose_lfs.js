import fs from 'fs';

try {
  if (fs.existsSync('src/assets/LOGO.png')) {
    const pngBuf = fs.readFileSync('src/assets/LOGO.png');
    console.log('LOGO.png size in bytes:', pngBuf.length);
    console.log('LOGO.png start content:', pngBuf.toString('utf8', 0, 100));
  }

  const buf = fs.readFileSync('src/assets/logo.webp');
  console.log('logo.webp size in bytes:', buf.length);
  console.log('logo.webp start content:', buf.toString('utf8', 0, 100));

  const creatorBuf = fs.readFileSync('src/assets/creator.webp');
  console.log('creator.webp size in bytes:', creatorBuf.length);
  console.log('creator.webp start content:', creatorBuf.toString('utf8', 0, 100));
} catch (e) {
  console.error('Error:', e.message);
}
