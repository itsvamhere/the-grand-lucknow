import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/home_ticker_dump.json', 'utf8'));

console.log('Parent outer:', data.parentOuter);
console.log('Rect:', data.rect);
console.log('Children count:', data.childrenCount);
console.log('Child rects:', data.childRects);
console.log('OuterHTML length:', data.outerHTML.length);
console.log('First 1500 chars of outerHTML:');
console.log(data.outerHTML.slice(0, 1500));
