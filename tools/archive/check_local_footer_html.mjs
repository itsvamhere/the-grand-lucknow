import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

// Find Footer Test or framer-192t1bg-container
const idx = html.indexOf('framer-192t1bg-container');
console.log('Index of framer-192t1bg-container in local index.html:', idx);
if (idx !== -1) {
  console.log(html.slice(idx, idx + 2500));
}
