import fs from 'node:fs';

const filePath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html';
let html = fs.readFileSync(filePath, 'utf8');

// Replace onLocScroll logic to measure the actual heading (h2)
const oldFuncRegex = /function onLocScroll\(\)\s*\{[\s\S]*?locSec\.style\.opacity = [^;]+;\s*\}\s*\}/;

const newFunc = `function onLocScroll() {
        var locH = locSec.querySelector('h2') || locSec;
        var r = locH.getBoundingClientRect();
        // Casa Momo dimming curve:
        // Fully visible (1.0) when heading is below 180px.
        // Smoothly dims down to 0.35 between 180px and 50px as it approaches the fixed navbar.
        // Stays dim (0.35) while overlapping "The Grand" logo so it still overlaps but is very dim.
        var fadeStart = 180;
        var fadeEnd = 50;
        var dimOpacity = 0.35;

        if (r.top >= fadeStart) {
          locSec.style.opacity = '1';
        } else if (r.top <= fadeEnd) {
          locSec.style.opacity = dimOpacity.toString();
        } else {
          var progress = (r.top - fadeEnd) / (fadeStart - fadeEnd);
          var currentOpacity = dimOpacity + progress * (1 - dimOpacity);
          locSec.style.opacity = currentOpacity.toFixed(3);
        }
      }`;

if (oldFuncRegex.test(html)) {
  html = html.replace(oldFuncRegex, newFunc);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Successfully updated onLocScroll to measure h2 directly with dimOpacity = 0.35!');
} else {
  console.error('oldFuncRegex did not match!');
}
