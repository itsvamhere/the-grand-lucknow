import fs from 'fs';

const content = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let i = 0;
while ((match = scriptRegex.exec(content)) !== null) {
  if (i >= 12) {
    console.log(`=== Script ${i} (length: ${match[1].length}) ===`);
    console.log(match[1].slice(0, 400));
  }
  i++;
}
