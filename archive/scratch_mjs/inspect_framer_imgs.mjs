import fs from 'fs';
import path from 'path';

const dir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts';
const files = [
  'dp5RxapaCfSZDIUmJAPG-pqEe4sCQP3YFN6nZtPiSRo.BJjlHCZa.mjs',
  'fr7SG9GQkh-Q7q0KIf8wgobOAuPxVSUAvz16mel55Cw.DZ6IOu8F.mjs',
  'IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs',
  'kUR3CfpW9NIyRzidNwuOKmKl470PoGVqflldEj15ME4.Sg5Y4YBO.mjs',
  'nteO2IV_oruZhnTtyytdbfV2QtZZPjMtQEspCiom9d8.B30j0rWH.mjs',
  'T5PVEAy5F.D5-RUb5a.mjs'
];

for (const f of files) {
  const full = path.join(dir, f);
  if (!fs.existsSync(full)) continue;
  const content = fs.readFileSync(full, 'utf-8');
  const matches = [...content.matchAll(/https:\/\/framerusercontent\.com\/images\/[^"'`]+/g)];
  console.log(`\n=== File: ${f} (${matches.length} matches) ===`);
  for (const m of matches) {
    console.log('  Image:', m[0]);
  }
}
