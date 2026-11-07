import fs from 'fs';

let content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs', 'utf8');

// Replace any occurrence of 9 with 5 in the count badge
content = content.replaceAll('children:`9`', 'children:`5`');
content = content.replaceAll('children:`9 Venues`', 'children:`5 Venues`');
content = content.replaceAll('children:`9 Spaces`', 'children:`5 Venues`');

fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs', content, 'utf8');
console.log('Updated venue count to 5 in IStDm');
