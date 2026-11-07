const fs = require('fs');
const path = require('path');
const baseDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const idxHtml = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');

// Find styles around 1xaaxij
let idx = 0;
while ((idx = idxHtml.indexOf('1xaaxij', idx)) !== -1) {
  const styleStart = idxHtml.lastIndexOf('<style', idx);
  const styleEnd = idxHtml.indexOf('</style>', idx);
  if (styleStart !== -1 && styleEnd !== -1 && idx > styleStart && idx < styleEnd) {
    console.log('1xaaxij style chunk:');
    console.log(idxHtml.substring(Math.max(styleStart, idx - 150), Math.min(styleEnd, idx + 400)));
    console.log('---');
  }
  idx += '1xaaxij'.length;
}
