import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Search for any occurrence of opacity in scripts
const scripts = [...html.matchAll(/<script[\s\S]*?<\/script>/g)].map(m => m[0]);
scripts.forEach((s, idx) => {
  if (s.includes('bigtext-1') || s.includes('Location')) {
    console.log(`Script ${idx} has match:\n`, s);
  }
});
