import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const code = fs.readFileSync(path.join(root, 'scripts', 'shared-lib.DganPNQZ.mjs'), 'utf8');
const idx = code.indexOf('AOxZDvmqQ');
console.log('Index of AOxZDvmqQ:', idx);
console.log(code.slice(idx - 200, idx + 1500));
