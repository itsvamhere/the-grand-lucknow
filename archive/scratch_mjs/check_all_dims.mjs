import fs from 'fs';

// Check aspect ratio or dimensions of raw photos
function getDims(path) {
  const buf = fs.readFileSync(path);
  // Simple JPEG dimension finder
  let i = 0;
  while (i < buf.length - 1) {
    if (buf[i] === 0xFF && (buf[i+1] === 0xC0 || buf[i+1] === 0xC2)) {
      const h = buf.readUInt16BE(i + 5);
      const w = buf.readUInt16BE(i + 7);
      return { w, h };
    }
    i++;
  }
  return null;
}

const dir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/raw_photos';
const files = fs.readdirSync(dir);
files.forEach(f => {
  if (f.endsWith('.jpg') || f.endsWith('.jpeg')) {
    const d = getDims(`${dir}/${f}`);
    if (d) console.log(`${f.padEnd(35)}: ${d.w} x ${d.h}`);
  }
});
