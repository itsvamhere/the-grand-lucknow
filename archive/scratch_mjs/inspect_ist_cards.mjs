import fs from 'fs';
const c = fs.readFileSync('scripts/IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs', 'utf8');

const idx = c.indexOf('Venue List');
if (idx !== -1) {
  console.log(c.substring(idx, idx + 1000));
} else {
  // search for .map(
  let mIdx = 0;
  while ((mIdx = c.indexOf('.map(', mIdx)) !== -1) {
    console.log(c.substring(mIdx - 40, mIdx + 120));
    mIdx += 5;
  }
}
