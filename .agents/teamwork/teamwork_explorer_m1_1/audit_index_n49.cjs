const fs = require('fs');
const path = require('path');
const baseDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const idxHtml = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');

function getFooter(html) {
  const start = html.indexOf('<footer');
  const end = html.indexOf('</footer>', start) + 9;
  return html.substring(start, end);
}

const fIdx = getFooter(idxHtml);

const n49Idx = fIdx.indexOf('class="framer-n49p1z"');
console.log('n49Idx:', n49Idx);
const n49End = fIdx.indexOf('</div>', n49Idx + 2000);
console.log(fIdx.substring(n49Idx, n49End + 6));
