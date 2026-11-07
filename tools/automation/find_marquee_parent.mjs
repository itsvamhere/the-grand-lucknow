import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

const svgIdx = html.indexOf('svg870196829_4253');
// Search backwards for the start of the marquee / ticker container
const ulStart = html.lastIndexOf('<ul', svgIdx);
const containerStart = html.lastIndexOf('<div', ulStart - 100);
console.log(html.slice(containerStart - 300, svgIdx + 200));
