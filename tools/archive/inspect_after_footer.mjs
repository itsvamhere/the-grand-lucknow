import fs from 'fs';
const html = fs.readFileSync('index.html', 'utf8');

// Check scripts after <footer>
const fEnd = html.indexOf('</footer>') + 9;
const afterFooter = html.slice(fEnd);
console.log('Scripts after footer length:', afterFooter.length);

// Look for any ticker scripts
const sRegex = /<script[\s\S]*?<\/script>/g;
let m;
while ((m = sRegex.exec(afterFooter)) !== null) {
  if (m[0].includes('ticker') || m[0].includes('Footer') || m[0].includes('footer') || m[0].includes('marquee')) {
    console.log('Script match:', m[0].slice(0, 300));
  }
}
