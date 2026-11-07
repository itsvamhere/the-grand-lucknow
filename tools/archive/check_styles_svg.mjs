import fs from 'fs';

const content = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const styleRegex = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
let match;
let i = 0;
while ((match = styleRegex.exec(content)) !== null) {
  const s = match[1];
  if (s.includes('data:image/svg+xml')) {
    console.log(`Found data:image/svg+xml in style tag ${i}!`);
    const idx = s.indexOf('data:image/svg+xml');
    console.log(s.slice(Math.max(0, idx - 50), Math.min(s.length, idx + 250)));
  }
  i++;
}
