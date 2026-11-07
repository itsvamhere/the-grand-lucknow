import fs from 'fs';
const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

console.log('--- CARDS REGION ---');
console.log(html.slice(314000, 328000));
