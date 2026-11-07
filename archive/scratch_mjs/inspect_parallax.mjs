import fs from 'fs';

const code = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/ParallaxImage.B0avVUfL.mjs', 'utf8');

// Find regex patterns with slashes or find where the error happens
console.log('File length:', code.length);
let lines = code.split('\n');
console.log('Total lines:', lines.length);

// Print all lines that have /
lines.forEach((l, idx) => {
  if (l.includes('/')) {
    console.log(`Line ${idx + 1}: ${l.substring(0, 150)}`);
  }
});
