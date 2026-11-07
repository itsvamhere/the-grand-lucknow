import fs from 'fs';

const idx = fs.readFileSync('index.html', 'utf8');
const pos = idx.indexOf('112.277 34.868');
console.log('Found 112.277 in index.html at:', pos);

if (pos !== -1) {
  console.log(idx.slice(pos - 150, pos + 250));
} else {
  console.log('Not in index.html! Checking scripts or CSS...');
}
