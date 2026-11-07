import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const idx = html.indexOf('svg870196829_4253');
console.log('Index of svg870196829_4253:', idx);
if (idx !== -1) {
  console.log(html.slice(idx - 50, idx + 1000));
}
