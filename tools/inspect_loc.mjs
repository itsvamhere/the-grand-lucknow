import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const locMatch = html.match(/id="bigtext-1"[\s\S]*?(?=<div[^>]*data-framer-name="Map"|<div[^>]*class="framer-1w67h4r|<div[^>]*data-framer-name="Details")/);
console.log(locMatch ? locMatch[0].slice(0, 1500) : 'not found');
