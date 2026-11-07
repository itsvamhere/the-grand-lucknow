import fs from 'fs';
import path from 'path';

// Let's inspect the first bytes or dimensions
const dir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/raw_photos';
const files = fs.readdirSync(dir);

for (const f of files) {
  const p = path.join(dir, f);
  const buf = Buffer.alloc(32);
  const fd = fs.openSync(p, 'r');
  fs.readSync(fd, buf, 0, 32, 0);
  fs.closeSync(fd);
  const stat = fs.statSync(p);
  console.log(`${f.padEnd(35)} ${(stat.size / 1024).toFixed(1)} KB`);
}
