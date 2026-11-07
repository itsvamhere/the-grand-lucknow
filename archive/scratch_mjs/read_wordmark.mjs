import fs from 'fs';

const path = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/wordmark.svg';
if (fs.existsSync(path)) {
  console.log(fs.readFileSync(path, 'utf8'));
} else {
  console.log('wordmark.svg not found on disk');
}
