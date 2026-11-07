import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs', 'utf-8');

const matches = [...content.matchAll(/import\s*\{[^}]*\bst\b[^}]*\}\s*from\s*['"][^'"]+['"]/g)];
for (const m of matches) {
  console.log('st imported from:', m[0]);
}

const matches2 = [...content.matchAll(/import\s*(\w+)\s*from\s*['"]\.\/T5PVEAy5F\.D5-RUb5a\.mjs['"]/g)];
for (const m of matches2) {
  console.log('T5PVEAy5F imported as:', m[0]);
}
