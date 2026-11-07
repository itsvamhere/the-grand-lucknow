import fs from 'fs';

// Check which raw_photo matches the exterior building
const files = fs.readdirSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/raw_photos');
console.log('Raw photos:');
files.forEach(f => {
  const stat = fs.statSync(`C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/raw_photos/${f}`);
  console.log(`- ${f}: ${stat.size} bytes`);
});
