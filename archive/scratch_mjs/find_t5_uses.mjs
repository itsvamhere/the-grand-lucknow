import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs', 'utf8');

// Search for uses of st or ot or at
const uses = [...content.matchAll(/\b(st|ot|at)\s*\(/g)];
console.log('Function call uses:', uses.map(u => u[0]));

// Let's find any JSX element using st
const jsxUses = [...content.matchAll(/d\((st|ot|at),/g)];
console.log('JSX element uses:', jsxUses.map(u => u[0]));
jsxUses.forEach(u => {
  console.log(content.substring(Math.max(0, u.index - 50), Math.min(content.length, u.index + 300)));
});
