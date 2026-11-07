import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs', 'utf8');

const idx = content.indexOf('T5PVEAy5F');
console.log(content.substring(Math.max(0, idx - 400), Math.min(content.length, idx + 800)));
