import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const idx = html.indexOf('<footer');
console.log('Index of <footer:', idx);
if (idx !== -1) {
  console.log(html.slice(idx, idx + 2000));
}
