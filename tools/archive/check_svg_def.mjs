import fs from 'fs';

const idx = fs.readFileSync('index.html', 'utf8');
const pos = idx.indexOf('id="svg870196829_4253"');
console.log('Position in index.html:', pos);

// Find the enclosing <svg> or container
const svgStart = idx.lastIndexOf('<svg', pos);
const svgEnd = idx.indexOf('</svg>', pos) + 6;
console.log('SVG length:', svgEnd - svgStart);
console.log('SVG snippet:', idx.slice(svgStart, svgStart + 200));

// Check if open-earth-lawn.html has svg870196829_4253
const lawn = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
console.log('open-earth-lawn has svg870196829_4253?', lawn.includes('svg870196829_4253'));
