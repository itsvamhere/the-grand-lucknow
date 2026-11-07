import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const footerPath = path.join(__dirname, 'extracted_home_footer.html');
const footer = fs.readFileSync(footerPath, 'utf8');

const aTags = footer.match(/<a\b[^>]*>[\s\S]*?<\/a>/gi) || [];
console.log('Total <a> tags in footer:', aTags.length);
aTags.forEach((a, i) => {
  const href = (a.match(/href="([^"]*)"/) || [])[1];
  const textMatch = a.replace(/<[^>]+>/g, '').trim();
  console.log(`${i}: href="${href}" text="${textMatch}"`);
});
