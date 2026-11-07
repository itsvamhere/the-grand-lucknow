import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const footer = fs.readFileSync(path.join(ROOT, 'tools', 'canonical_footer.html'), 'utf8');

const match = footer.match(/<div[^>]*data-framer-name="Footer Logo"[\s\S]*?<\/ul>\s*<\/div>/i);
if (match) {
  console.log('Ticker length:', match[0].length);
  console.log(match[0].slice(0, 500));
}
