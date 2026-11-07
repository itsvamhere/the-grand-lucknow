import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('backgroundColor') || line.includes('background-color') || (line.includes('style.') && line.includes('background'))) {
    console.log(`Line ${idx + 1}: ${line.trim().slice(0, 150)}`);
  }
});
