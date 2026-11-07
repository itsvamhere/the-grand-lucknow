const fs = require('fs');
const path = require('path');

const baseDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const idxHtml = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
const subHtml = fs.readFileSync(path.join(baseDir, 'venues/open-earth-lawn.html'), 'utf8');

const scriptTagsIdx = idxHtml.match(/<script[\s\S]*?<\/script>/gi) || [];
console.log('INDEX Script 12:', scriptTagsIdx[12]);
console.log('INDEX Script 13 snippet:', scriptTagsIdx[13].substring(0, 500));

const scriptTagsSub = subHtml.match(/<script[\s\S]*?<\/script>/gi) || [];
for (let i = 12; i < scriptTagsSub.length; i++) {
  console.log(`SUB Script ${i} snippet:`, scriptTagsSub[i].substring(0, 300));
}
