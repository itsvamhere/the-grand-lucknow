import fs from 'fs';

const html = fs.readFileSync('venues.html', 'utf8');

const headStart = html.indexOf('<header');
const headEnd = html.indexOf('</header>') + 9;
console.log('venues.html header length:', headEnd - headStart);

const footStart = html.indexOf('<footer');
const footEnd = html.indexOf('</footer>') + 9;
console.log('venues.html footer length:', footEnd - footStart);
