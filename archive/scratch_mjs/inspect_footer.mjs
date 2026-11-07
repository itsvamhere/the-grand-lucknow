import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const html = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

// Look for footer in index.html
const footerIdx = html.indexOf('footer');
console.log('--- Footer search in index.html ---');
const footerMatches = [...html.matchAll(/(.{0,100}(?:footer|ATNHEDE|svg870196829).{0,100})/gi)];
footerMatches.slice(0, 10).forEach((m, i) => {
  console.log(`[Footer ${i}]`, m[0].replace(/\s+/g, ' '));
});

// Check where the oversized footer wordmark is in index.html
const svgFooter = html.match(/<svg[^>]*viewBox="0 0 1202[^"]*"[\s\S]*?<\/svg>/gi) || html.match(/<svg[^>]*viewBox="0 0 2404[^"]*"[\s\S]*?<\/svg>/gi) || [];
console.log('SVG footer matches count:', svgFooter.length);
svgFooter.forEach(s => console.log(s));
