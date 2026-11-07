const fs = require('fs');
const path = require('path');
const baseDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const idxHtml = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');

// Find all CSS rules mentioning framer-7mgt1k or 1xaaxij or kzj5yp or Footer Link
['framer-7mgt1k', 'framer-1qqdrhj', '1xaaxij', 'kzj5yp', 'Footer Link'].forEach(selector => {
  let idx = 0;
  console.log(`=== Matches for ${selector} in index.html styles ===`);
  while ((idx = idxHtml.indexOf(selector, idx)) !== -1) {
    console.log(idxHtml.substring(Math.max(0, idx - 80), Math.min(idxHtml.length, idx + 150)));
    console.log('---');
    idx += selector.length;
  }
});
