import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');

const hStyles = homeHtml.match(/\.framer-bg7hsc[^{]*\{[^}]*\}/g);
console.log('Home header styles:\n', hStyles);

const subStyles = fs.readFileSync('venues/open-earth-lawn.html', 'utf8').match(/\.framer-1i47qog[^{]*\{[^}]*\}/g);
console.log('Subpage header styles:\n', subStyles);
