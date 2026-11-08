import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const footStart = html.indexOf('<footer');
const footEnd = html.indexOf('</footer>') + 9;
console.log('open-earth-lawn.html footer length:', footEnd - footStart);
