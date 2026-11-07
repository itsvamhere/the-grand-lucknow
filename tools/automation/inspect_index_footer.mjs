import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');
const idx = html.indexOf('<footer');
if (idx !== -1) {
  const endIdx = html.indexOf('</footer>', idx);
  console.log('Footer found in index.html, length:', endIdx + 9 - idx);
  console.log('First 500 chars of footer:');
  console.log(html.slice(idx, idx + 500));
  console.log('Last 500 chars of footer:');
  console.log(html.slice(endIdx - 500, endIdx + 9));
} else {
  console.log('No <footer tag in index.html');
}
