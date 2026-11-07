import fs from 'fs';

const idxHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');
const lawnHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

function getHeader(html) {
  const start = html.indexOf('<header');
  const end = html.indexOf('</header>', start);
  return html.slice(start, end + 9);
}

const idxH = getHeader(idxHtml);
const lawnH = getHeader(lawnHtml);

console.log('Index header length:', idxH.length);
console.log('Lawn header length:', lawnH.length);

fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/implementer_1/full_idx_header.html', idxH, 'utf8');
fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/implementer_1/full_lawn_header.html', lawnH, 'utf8');
console.log('Saved both full headers to files for inspection.');
