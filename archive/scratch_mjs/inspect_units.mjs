import fs from 'fs';

function inspectUnits(file) {
  console.log(`=== ${file} ===`);
  const content = fs.readFileSync(file, 'utf8');
  const matches = [...content.matchAll(/(?:sqft|sq ft|sq ft|m2)[^<>\n\r]{0,80}/gi)];
  matches.slice(0, 10).forEach(m => console.log(' *', m[0]));
}

inspectUnits('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/14PpIjURtv5CdQXDMn99raf7YM3QUA_-H98WqlKe9_I.2gYakk5U.mjs');
inspectUnits('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs');
