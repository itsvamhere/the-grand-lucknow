const fs = require('fs');
const subHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');
const idxHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

const mIdx = idxHtml.match(/<style data-framer-breakpoint-css>[\s\S]*?<\/style>/);
console.log('INDEX breakpoint style:');
console.log(mIdx ? mIdx[0] : 'None');

const mSub = subHtml.match(/<style data-framer-breakpoint-css>[\s\S]*?<\/style>/);
console.log('SUBPAGE breakpoint style:');
console.log(mSub ? mSub[0] : 'None');
