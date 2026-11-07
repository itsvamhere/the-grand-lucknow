import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const lawnHtml = fs.readFileSync(path.join(ROOT, 'venues', 'open-earth-lawn.html'), 'utf8');

const indexFramerLinks = indexHtml.match(/https:\/\/framerusercontent\.com\/sites\/[^\"]+/g) || [];
const lawnFramerLinks = lawnHtml.match(/https:\/\/framerusercontent\.com\/sites\/[^\"]+/g) || [];

console.log('framerusercontent.com/sites in index.html:', indexFramerLinks.length);
console.log('framerusercontent.com/sites in lawnHtml:', lawnFramerLinks.length);
if (lawnFramerLinks.length > 0) {
  lawnFramerLinks.slice(0, 5).forEach(l => console.log('Lawn link:', l));
}
