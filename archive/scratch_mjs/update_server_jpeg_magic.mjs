import fs from 'fs';

let code = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/server.mjs', 'utf8');

// Update magic-byte detection to support both PNG and JPEG in .webp files
code = code.replace(
  `if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) {
          mimeType = 'image/png';
        }`,
  `if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) {
          mimeType = 'image/png';
        } else if (buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF) {
          mimeType = 'image/jpeg';
        }`
);

fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/server.mjs', code, 'utf8');
console.log('Updated server.mjs to support JPEG magic bytes in .webp files');
