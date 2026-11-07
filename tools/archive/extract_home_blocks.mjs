import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('ROOT:', ROOT);
const indexPath = path.join(ROOT, 'index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf8');

const headerMatch = indexHtml.match(/<header[\s\S]*?<\/header>/i);
const footerMatch = indexHtml.match(/<footer[\s\S]*?<\/footer>/i);

console.log('Header length:', headerMatch ? headerMatch[0].length : 0);
console.log('Footer length:', footerMatch ? footerMatch[0].length : 0);

if (headerMatch) {
  fs.writeFileSync(path.join(__dirname, 'extracted_home_header.html'), headerMatch[0]);
}
if (footerMatch) {
  fs.writeFileSync(path.join(__dirname, 'extracted_home_footer.html'), footerMatch[0]);
}

console.log('Successfully saved extracted blocks into tools/');
