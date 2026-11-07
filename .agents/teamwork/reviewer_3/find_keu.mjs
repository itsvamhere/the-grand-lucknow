import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf-8');
const lines = content.split('\n');
lines.forEach((line, i) => {
  if (line.includes('framer-keuai4-container')) {
    console.log('Mobile container line:', i + 1);
  }
});
