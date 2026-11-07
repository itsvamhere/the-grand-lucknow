const fs = require('fs');
const idxHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

const c2Idx = idxHtml.indexOf('<img src="/images/card_2_grassland_gala.webp"');
const c2End = idxHtml.indexOf('>', c2Idx) + 1;
console.log('=== EXACT CARD 2 IMG IN INDEX.HTML ===');
console.log(idxHtml.substring(c2Idx, c2End));

const c3Idx = idxHtml.indexOf('<img src="/images/card_3_ballroom.webp"');
const c3End = idxHtml.indexOf('>', c3Idx) + 1;
console.log('=== EXACT CARD 3 IMG IN INDEX.HTML ===');
console.log(idxHtml.substring(c3Idx, c3End));
