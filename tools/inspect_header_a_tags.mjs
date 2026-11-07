import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const headerPath = path.join(__dirname, 'extracted_home_header.html');
const header = fs.readFileSync(headerPath, 'utf8');

const aTags = header.match(/<a\b[^>]*>[\s\S]*?<\/a>/gi) || [];
console.log('Total <a> tags in header:', aTags.length);
aTags.forEach((a, i) => {
  const href = (a.match(/href="([^"]*)"/) || [])[1];
  const aria = (a.match(/aria-label="([^"]*)"/) || [])[1];
  const name = (a.match(/data-framer-name="([^"]*)"/) || [])[1];
  console.log(`${i}: href="${href}" aria-label="${aria}" data-framer-name="${name}"`);
});
