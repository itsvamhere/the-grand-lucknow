import fs from 'fs';

const content = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const styleRegex = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
let match;
let i = 0;
while ((match = styleRegex.exec(content)) !== null) {
  if (i === 25) {
    console.log('=== STYLE 25 FULL CONTENT ===');
    console.log(match[1]);
  }
  i++;
}
