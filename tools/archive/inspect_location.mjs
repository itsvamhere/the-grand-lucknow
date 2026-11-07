import fs from 'fs';

const c = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Location markup in #bigtext-1
const locIdx = c.indexOf('id="bigtext-1"');
console.log('Location markup:');
console.log(c.slice(locIdx, locIdx + 2000));

// onLocScroll in script
const scrollIdx = c.indexOf('var locSec = document.getElementById(\'bigtext-1\');');
console.log('\n--- onLocScroll script: ---');
console.log(c.slice(scrollIdx - 50, scrollIdx + 1200));

// Location styles in CSS
const locCssIdx = c.indexOf('#bigtext-1');
console.log('\n--- #bigtext-1 in CSS: ---');
console.log(c.slice(locCssIdx - 50, locCssIdx + 600));
