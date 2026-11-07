import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

// Find the big logo / text at bottom of footer in index.html
const fStart = html.indexOf('<footer');
const fEnd = html.indexOf('</footer>', fStart);
const fHtml = html.slice(fStart, fEnd);

// Find svg870196829_4253 or any ticker/marquee in fHtml
console.log('Includes svg870196829_4253:', fHtml.includes('svg870196829_4253'));
const svgIdx = fHtml.indexOf('svg870196829_4253');
if (svgIdx !== -1) {
  console.log('Context around svg870196829_4253:');
  console.log(fHtml.slice(svgIdx - 400, svgIdx + 600));
}
