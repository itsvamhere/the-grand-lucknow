import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const footStart = html.indexOf('<footer');
const footEnd = html.indexOf('</footer>') + 9;
const footer = html.slice(footStart, footEnd);

console.log('Footer length:', footer.length);
console.log('Footer first 500 chars:\n', footer.slice(0, 500));
console.log('Footer last 500 chars:\n', footer.slice(-500));
