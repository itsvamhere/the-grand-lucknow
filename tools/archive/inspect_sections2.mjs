import fs from 'fs';

const c = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

console.log('--- 1. Location Section ---');
const locIdx = c.indexOf('id="bigtext-1"');
console.log('locIdx:', locIdx);
if (locIdx !== -1) {
  console.log(c.slice(locIdx, locIdx + 1200));
}

console.log('--- 2. onLocScroll in script ---');
const scrIdx = c.indexOf('onLocScroll()');
console.log('scrIdx:', scrIdx);
if (scrIdx !== -1) {
  console.log(c.slice(scrIdx - 100, scrIdx + 600));
}

console.log('--- 3. Map Pointer ---');
const ptrIdx = c.indexOf('id="grand-live-pointer"');
console.log('ptrIdx:', ptrIdx);
if (ptrIdx !== -1) {
  console.log(c.slice(ptrIdx - 50, ptrIdx + 500));
}

console.log('--- 4. Map style tags ---');
const mapStyleIdx = c.indexOf('grand-subpage-map-styles');
console.log('mapStyleIdx:', mapStyleIdx);
if (mapStyleIdx !== -1) {
  console.log(c.slice(mapStyleIdx - 50, mapStyleIdx + 500));
}

console.log('--- 5. Other Venues ---');
const ovIdx = c.indexOf('Other Venues');
console.log('ovIdx:', ovIdx);
if (ovIdx !== -1) {
  console.log(c.slice(ovIdx - 100, ovIdx + 2000));
}
