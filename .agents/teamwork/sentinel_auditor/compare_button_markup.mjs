import fs from 'fs';

const indexHtml = fs.readFileSync('C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo\\index.html', 'utf8');
const lawnHtml = fs.readFileSync('C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo\\venues\\open-earth-lawn.html', 'utf8');

const mIndex = (indexHtml.match(/<a[^>]*data-framer-name="White"[^>]*>[\s\S]*?<\/a>/i) || [])[0];
const mLawn = (lawnHtml.match(/<a[^>]*data-framer-name="White"[^>]*>[\s\S]*?<\/a>/i) || [])[0];

console.log('--- INDEX BUTTON ---');
console.log(mIndex);
console.log('\n--- LAWN BUTTON ---');
console.log(mLawn);
