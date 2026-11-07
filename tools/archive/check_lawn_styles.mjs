import fs from 'fs';

const content = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const styleRegex = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
let match;
let i = 0;
while ((match = styleRegex.exec(content)) !== null) {
  const styleContent = match[1];
  if (styleContent.includes('framer-xj8hz2') || styleContent.includes('Footer Logo') || styleContent.includes('background-image')) {
    console.log(`Style ${i} matches! Length: ${styleContent.length}`);
    console.log(styleContent.slice(0, 500));
  }
  i++;
}
console.log(`Total style tags: ${i}`);
