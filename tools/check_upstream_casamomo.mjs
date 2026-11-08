import fs from 'fs';

const up = fs.readFileSync('archive/upstream_html/upstream_boutique-n1.html', 'utf8');
const fStart = up.indexOf('<footer');
const fEnd = up.indexOf('</footer>') + 9;
const footer = up.slice(fStart, fEnd);

// Find where "casamomo" is in footer
let pos = 0;
while ((pos = footer.indexOf('casamomo', pos)) !== -1) {
  console.log('Found casamomo at:', pos);
  console.log(footer.slice(Math.max(0, pos - 50), Math.min(footer.length, pos + 100)));
  console.log('---');
  pos += 8;
}
