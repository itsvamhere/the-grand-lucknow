import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const h1Container = html.match(/class="framer-13ijl2f-container"[\s\S]*?<\/h1>[\s\S]*?<\/div>\s*<\/div>/);
console.log(h1Container ? h1Container[0].slice(0, 3000) : 'not found');
