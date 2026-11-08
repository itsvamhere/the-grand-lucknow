import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find all occurrences of bigtext-1
let pos = 0;
while ((pos = html.indexOf('bigtext-1', pos)) !== -1) {
  console.log('--- bigtext-1 at', pos, '---');
  console.log(html.slice(Math.max(0, pos - 150), Math.min(html.length, pos + 250)));
  pos += 9;
}

// Check CSS rules mentioning bigtext-1 or Location
const styles = [...html.matchAll(/<style[\s\S]*?<\/style>/g)].map(m => m[0]);
styles.forEach((s, i) => {
  if (s.includes('bigtext-1') || s.includes('framer-3msmtm') || s.includes('framer-179pke1')) {
    console.log(`Style ${i} has match:`, s.slice(0, 300));
  }
});
