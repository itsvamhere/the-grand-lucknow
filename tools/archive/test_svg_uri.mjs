import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const desktopSvg = fs.readFileSync(path.join(ROOT, 'tools', 'archive', 'the_grand_footer_desktop.svg'), 'utf8');

// Build data URI
const svgDataUri = 'data:image/svg+xml,' + encodeURIComponent(desktopSvg);

console.log('SVG Data URI length:', svgDataUri.length);
console.log('First 100 chars:', svgDataUri.slice(0, 100));
console.log('Contains M 112.277?', svgDataUri.includes('M%20112.277') || svgDataUri.includes('M 112.277'));
