import fs from 'node:fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

['logo', 'wordmark', 'THE GRAND', 'The Grand', 'casamomo'].forEach(k => {
  let count = 0;
  let idx = -1;
  while ((idx = html.indexOf(k, idx + 1)) !== -1) {
    count++;
    if (count <= 2) {
      console.log(`Key "${k}" at ${idx}:`, html.slice(Math.max(0, idx - 80), Math.min(html.length, idx + 120)));
    }
  }
  console.log(`Total "${k}": ${count}`);
});
