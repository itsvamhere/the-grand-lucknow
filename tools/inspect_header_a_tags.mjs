import fs from 'fs';

const header = fs.readFileSync('tools/extracted_home_header.html', 'utf8');

// Let's inspect all 'a' tags in header
const aTags = header.match(/<a\b[^>]*>[\s\S]*?<\/a>/gi) || [];
console.log('Total <a> tags in header:', aTags.length);
aTags.forEach((a, i) => {
  const href = (a.match(/href="([^"]*)"/) || [])[1];
  const aria = (a.match(/aria-label="([^"]*)"/) || [])[1];
  const name = (a.match(/data-framer-name="([^"]*)"/) || [])[1];
  console.log(`${i}: href="${href}" aria-label="${aria}" data-framer-name="${name}"`);
});
