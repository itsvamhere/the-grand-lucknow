import fs from 'node:fs';

const lawnPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html';
let lawn = fs.readFileSync(lawnPath, 'utf8');

const target = `var allNodes = document.querySelectorAll('p, span, div');
    allNodes.forEach(function(el) {
      if (el.children.length === 0 && el.innerText) {`;

const replacement = `var allNodes = document.querySelectorAll('p, span, div');
    allNodes.forEach(function(el) {
      if (el.closest('footer')) return;
      if (el.children.length === 0 && el.innerText) {`;

if (lawn.includes(target)) {
  lawn = lawn.replace(target, replacement);
  fs.writeFileSync(lawnPath, lawn, 'utf8');
  console.log('Successfully protected footer from hydration text replacement!');
} else {
  console.error('Target not found in lawn!');
}
