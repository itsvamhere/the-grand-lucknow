import fs from 'fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');
const match = html.match(/<script\s+id="grand-subpage-engine-js">([\s\S]*?)<\/script>/);

if (match) {
  fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/auditor_2/current_engine.js', match[1]);
  console.log('Saved current_engine.js, length:', match[1].length);
  // print lines around rolloutEnd and colorEnd
  const lines = match[1].split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('rolloutEnd') || line.includes('colorEnd') || line.includes('p6DocBottom') || line.includes('scrollMax')) {
      console.log(`L${idx + 1}: ${line}`);
    }
  });
} else {
  console.log('Engine script not found!');
}
