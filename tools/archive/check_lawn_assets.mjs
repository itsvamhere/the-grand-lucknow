import fs from 'fs';

const content = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const links = content.match(/<link[^>]+>/g) || [];
console.log('LINKS:');
links.forEach(l => console.log(l));

const scripts = content.match(/<script[^>]*src=[^>]+>/g) || [];
console.log('SCRIPTS WITH SRC:');
scripts.forEach(s => console.log(s));
