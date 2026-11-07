import fs from 'fs';

const home = fs.readFileSync('index.html', 'utf8');
const sub = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Check style blocks for framer-zHQwT
const homeStyles = home.match(/\.framer-zHQwT[^{]*\{[^}]*\}/g) || [];
const subStyles = sub.match(/\.framer-zHQwT[^{]*\{[^}]*\}/g) || [];

console.log('Home zHQwT rule count:', homeStyles.length);
console.log('Subpage zHQwT rule count:', subStyles.length);
