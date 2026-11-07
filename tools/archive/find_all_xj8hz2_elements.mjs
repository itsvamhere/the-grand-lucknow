import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
let pos = 0;
while ((pos = html.indexOf('class="framer-xj8hz2"', pos)) !== -1) {
  console.log('Found element at pos', pos);
  console.log(html.slice(pos - 50, pos + 500));
  pos += 21;
}
