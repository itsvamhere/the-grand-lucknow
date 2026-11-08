import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const logoIdx = html.indexOf('data-framer-name="Logo"');
console.log('Logo snippet in open-earth-lawn.html:\n', html.slice(logoIdx - 50, logoIdx + 500));
