import fs from 'fs';

let h = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const oldCss = `<style id="grand-location-contrast-css">
#bigtext-1 h2 {
  color: #4E5240 !important;
  text-transform: capitalize !important;
}
#bigtext-1 h2 span {
  color: #4E5240 !important;
  text-transform: capitalize !important;
}
#bigtext-1 [data-framer-name="Button Wrapper"] a.framer-vO7O2,
#bigtext-1 a.dark-btn {
  background-color: #616452 !important;
  color: #FFF0CA !important;
  opacity: 1 !important;
  border-color: #616452 !important;
}
#bigtext-1 [data-framer-name="Button Wrapper"] a.framer-vO7O2 *,
#bigtext-1 a.dark-btn * {
  color: #FFF0CA !important;
  fill: #FFF0CA !important;
}
</style>`;

const newCss = `<style id="grand-location-contrast-css">
#bigtext-1 h2 {
  color: var(--token-a0f3f7f0-2bee-4607-a7b2-647fda358cb3, rgb(14, 18, 1)) !important;
  text-transform: capitalize !important;
  transition: opacity 0.2s ease-out !important;
}
#bigtext-1 h2 span {
  color: var(--token-a0f3f7f0-2bee-4607-a7b2-647fda358cb3, rgb(14, 18, 1)) !important;
  text-transform: capitalize !important;
}
#bigtext-1 [data-framer-name="Button Wrapper"] {
  transition: opacity 0.2s ease-out !important;
}
#bigtext-1 [data-framer-name="Button Wrapper"] a.framer-vO7O2,
#bigtext-1 a.dark-btn {
  background-color: #616452 !important;
  color: #FFF0CA !important;
  border-color: #616452 !important;
}
#bigtext-1 [data-framer-name="Button Wrapper"] a.framer-vO7O2 *,
#bigtext-1 a.dark-btn * {
  color: #FFF0CA !important;
  fill: #FFF0CA !important;
}
</style>`;

// Replace normalizing newlines
const oldNorm = oldCss.replace(/\r?\n/g, '\n');
const hNorm = h.replace(/\r?\n/g, '\n');

if (hNorm.includes(oldNorm)) {
  const updated = hNorm.replace(oldNorm, newCss.replace(/\r?\n/g, '\n'));
  fs.writeFileSync('venues/open-earth-lawn.html', updated, 'utf8');
  console.log('Successfully updated venues/open-earth-lawn.html CSS!');
} else {
  console.error('Could not find oldCss in open-earth-lawn.html');
}
