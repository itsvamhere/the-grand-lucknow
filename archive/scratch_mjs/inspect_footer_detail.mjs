import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const html = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

// Find the footer container
const footerStart = html.indexOf('data-framer-name="Footer"');
if (footerStart !== -1) {
  console.log('--- Found Footer in index.html ---');
  console.log(html.substring(footerStart - 100, footerStart + 2500));
} else {
  // search for svg870196829_4253
  const svgIdx = html.indexOf('svg870196829_4253');
  console.log('--- svg870196829_4253 index:', svgIdx);
  if (svgIdx !== -1) {
    console.log(html.substring(svgIdx - 300, svgIdx + 700));
  }
}
