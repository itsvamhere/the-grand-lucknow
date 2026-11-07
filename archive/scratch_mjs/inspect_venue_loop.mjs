import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs', 'utf8');

const idx = content.indexOf('"data-framer-name":`Venue Item`');
console.log(content.substring(Math.max(0, idx - 1200), idx + 100));
