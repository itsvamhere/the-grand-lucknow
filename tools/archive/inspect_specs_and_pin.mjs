import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');
const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

console.log('=== SEARCHING OPEN EARTH LAWN SPECS IN HOME ===');
const oMatches = [...homeHtml.matchAll(/Open Earth Lawn[\s\S]{0,300}/gi)];
oMatches.forEach((m, i) => console.log(`[Home match ${i}]:`, m[0].replace(/\s+/g, ' ')));

console.log('=== SEARCHING 55,000 OR 1,500 IN HOME ===');
const numMatches = [...homeHtml.matchAll(/(?:55,000|55000|1,500|1500)[\s\S]{0,100}/gi)];
numMatches.forEach((m, i) => console.log(`[Num match ${i}]:`, m[0].replace(/\s+/g, ' ')));

console.log('=== SEARCHING SPECS IN SUBPAGE ===');
const subBadges = [...subHtml.matchAll(/(?:Sqft|sqft)[\s\S]{0,150}/gi)];
subBadges.forEach((m, i) => console.log(`[Sub badge ${i}]:`, m[0].replace(/\s+/g, ' ')));

console.log('=== MAP PIN COORDINATES IN HOME ===');
const mapPinIdx = homeHtml.indexOf('the_grand_lucknow') !== -1 ? homeHtml.indexOf('the_grand_lucknow') : homeHtml.indexOf('coordinates');
if (mapPinIdx !== -1) {
  console.log('Home map coordinates snippet:\n', homeHtml.slice(Math.max(0, mapPinIdx - 200), mapPinIdx + 400));
}
