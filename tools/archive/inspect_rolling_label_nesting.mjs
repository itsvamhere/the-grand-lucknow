import fs from 'fs';

const home = fs.readFileSync('index.html', 'utf8');
const footer = home.match(/<footer[\s\S]*?<\/footer>/)[0];

const idx = footer.indexOf('data-rolling-label');
console.log('Sample data-rolling-label block:');
console.log(footer.slice(idx - 10, idx + 1500));
