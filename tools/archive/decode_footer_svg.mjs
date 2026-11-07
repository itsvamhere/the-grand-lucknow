import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const raw = fs.readFileSync(path.join(root, 'tools', 'casamomo_footer_bg_image.txt'), 'utf8');

// Strip url("data:image/svg+xml, ... ")
const svgContent = raw.replace(/^url\(["']?data:image\/svg\+xml,/, '').replace(/["']?\)$/, '');
const decoded = decodeURIComponent(svgContent);

console.log('Decoded SVG:');
console.log(decoded.slice(0, 300));
console.log('Decoded SVG length:', decoded.length);

fs.writeFileSync(path.join(root, 'tools', 'casamomo_footer_decoded.svg'), decoded);
