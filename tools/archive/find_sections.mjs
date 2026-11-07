import fs from 'fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/test_noframer.html', 'utf8');

// Find all occurrences of "Details" or "Features"
const sections = ['Details', 'Features', 'Description', 'Location'];
for (const s of sections) {
  let idx = 0;
  while ((idx = html.indexOf(s, idx)) !== -1) {
    console.log(`Found "${s}" at index ${idx}:`);
    console.log(html.substring(Math.max(0, idx - 50), Math.min(html.length, idx + 200)));
    console.log('---');
    idx += s.length;
  }
}
