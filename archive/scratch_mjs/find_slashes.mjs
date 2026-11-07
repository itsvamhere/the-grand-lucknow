import fs from 'fs';

const code = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/ParallaxImage.B0avVUfL.mjs', 'utf8');

// Find all occurrences of /
for (let i = 0; i < code.length; i++) {
  if (code[i] === '/') {
    const snippet = code.substring(Math.max(0, i - 20), Math.min(code.length, i + 30));
    console.log(`[${i}] ${snippet}`);
  }
}
