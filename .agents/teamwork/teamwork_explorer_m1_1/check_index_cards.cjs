const fs = require('fs');
const idxHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

const c2Idx = idxHtml.indexOf('card_2');
console.log('card_2 in index.html:', c2Idx);
if (c2Idx !== -1) {
  console.log(idxHtml.substring(c2Idx - 100, c2Idx + 300));
}

const c3Idx = idxHtml.indexOf('card_3');
console.log('card_3 in index.html:', c3Idx);
if (c3Idx !== -1) {
  console.log(idxHtml.substring(c3Idx - 100, c3Idx + 300));
}
