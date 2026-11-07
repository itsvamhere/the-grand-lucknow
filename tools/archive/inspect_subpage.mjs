import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');
const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

console.log('=== HOME FOOTER ===');
const homeFooterMatch = homeHtml.match(/<footer[\s\S]*?<\/footer>/i) || homeHtml.match(/data-framer-name=["']Footer["'][\s\S]*?<\/section>/i);
if (homeFooterMatch) {
  console.log('Home footer found, length:', homeFooterMatch[0].length);
  console.log('Home footer snippet:', homeFooterMatch[0].slice(0, 300));
} else {
  console.log('Home footer not found via direct tag.');
}

console.log('=== SUBPAGE FOOTER ===');
const subFooterMatch = subHtml.match(/<footer[\s\S]*?<\/footer>/i) || subHtml.match(/data-framer-name=["']Footer["'][\s\S]*?<\/section>/i);
if (subFooterMatch) {
  console.log('Sub footer found, length:', subFooterMatch[0].length);
  console.log('Sub footer snippet:', subFooterMatch[0].slice(0, 300));
} else {
  console.log('Sub footer not found via direct tag.');
}

// Find location overlap in subpage
console.log('=== LOCATION IN SUBPAGE ===');
const locIdx = subHtml.indexOf('location');
const LocIdx = subHtml.indexOf('Location');
console.log('Index of lowercase location:', locIdx, 'Index of uppercase Location:', LocIdx);
if (LocIdx !== -1) {
  console.log(subHtml.slice(LocIdx - 100, LocIdx + 300));
}

// Find map pin / pulse in subpage
console.log('=== MAP PIN IN SUBPAGE ===');
const mapPinIdx = subHtml.indexOf('Check Availability');
if (mapPinIdx !== -1) {
  console.log(subHtml.slice(mapPinIdx - 200, mapPinIdx + 200));
}

// Find gallery numbering in subpage
console.log('=== GALLERY IN SUBPAGE ===');
const galIdx = subHtml.indexOf('Living Room');
if (galIdx !== -1) {
  console.log(subHtml.slice(galIdx - 100, galIdx + 300));
}
