const fs = require('fs');
const path = require('path');
const baseDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const idxHtml = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
const subHtml = fs.readFileSync(path.join(baseDir, 'venues/open-earth-lawn.html'), 'utf8');

const mIdx = idxHtml.match(/<div[^>]*class="[^"]*framer-xj8hz2[^"]*"[^>]*>/gi);
console.log('INDEX matches for framer-xj8hz2 div:', mIdx ? mIdx.length : 0);
if (mIdx) {
  mIdx.forEach((m, i) => console.log(`Idx match ${i}:`, m.substring(0, 300)));
}

const mSub = subHtml.match(/<div[^>]*class="[^"]*framer-xj8hz2[^"]*"[^>]*>/gi);
console.log('SUB matches for framer-xj8hz2 div:', mSub ? mSub.length : 0);
if (mSub) {
  mSub.forEach((m, i) => console.log(`Sub match ${i}:`, m.substring(0, 300)));
}
