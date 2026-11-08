import fs from 'fs';

for (let i = 1; i <= 6; i++) {
  const p = `images/thumb_${i}.webp`;
  if (fs.existsSync(p)) {
    console.log(p, fs.statSync(p).size);
  }
}
