import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

const vMatch = indexHtml.match(/<footer[\s\S]*?<\/footer>/i)[0].match(/<a[^>]*href="\/venues"[^>]*>[\s\S]*?<\/a>/i);
if (vMatch) {
  console.log('index.html /venues link inner text:');
  console.log(vMatch[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
}
