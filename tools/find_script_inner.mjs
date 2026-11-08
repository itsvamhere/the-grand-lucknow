import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const scriptIdx = html.indexOf('if (txt === \'Venue Scale\'');
console.log('Script at:', scriptIdx);
console.log(html.slice(scriptIdx - 100, scriptIdx + 600));
