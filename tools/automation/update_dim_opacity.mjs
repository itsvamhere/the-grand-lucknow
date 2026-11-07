import fs from 'node:fs';

const filePath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html';
let html = fs.readFileSync(filePath, 'utf8');

// Find onLocScroll function and update it
const oldFunc = `      function onLocScroll() {
        var r = locSec.getBoundingClientRect();
        // Between top 150px (fully visible) and top 35px (reaching navbar logo), fade out smoothly
        if (r.top >= 150) {
          locSec.style.opacity = '1';
        } else if (r.top <= 35) {
          locSec.style.opacity = '0';
        } else {
          var progress = (r.top - 35) / (150 - 35);
          locSec.style.opacity = progress.toFixed(3);
        }
      }`;

const newFunc = `      function onLocScroll() {
        var r = locSec.getBoundingClientRect();
        // Casa Momo dimming curve:
        // Fully visible (1.0) when top >= 150px.
        // Smoothly dims down to ~0.35 between 150px and 45px.
        // Stays dim (0.35) while overlapping the fixed navbar so it still overlaps but is very dim.
        var fadeStart = 150;
        var fadeEnd = 45;
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

if (html.includes(oldFunc)) {
  html = html.replace(oldFunc, newFunc);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Successfully updated onLocScroll to dimOpacity = 0.35!');
} else {
  console.error('oldFunc not found!');
}
