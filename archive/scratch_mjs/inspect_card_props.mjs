import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs', 'utf8');

const matches = [...content.matchAll(/KRWkRkyFp|clTtUpZji/g)];
console.log('Matches in IStDm:', matches.length);
matches.forEach(m => {
  console.log(content.substring(Math.max(0, m.index - 50), Math.min(content.length, m.index + 200)));
});
