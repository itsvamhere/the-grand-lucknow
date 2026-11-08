import fs from 'fs';

const html = fs.readFileSync('tools/casamomo_live_subpage.html', 'utf8');

const regex = /<div[^>]*data-framer-name="Footer Logo"[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi;
let match;
while ((match = regex.exec(html)) !== null) {
  console.log('--- Found Footer Logo match ---');
  console.log(match[0].slice(0, 1000));
}
