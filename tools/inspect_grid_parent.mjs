import fs from 'fs';

const idx = fs.readFileSync('index.html', 'utf8');
const match1 = idx.indexOf('data-framer-name="Venue Item"');
console.log('Match 1 at:', match1);
console.log(idx.slice(match1 - 600, match1 + 400));
