import fs from 'fs';

// 1. Read the authentic serif vector SVG
const serifSvg = fs.readFileSync('tools/archive/the_grand_footer_desktop.svg', 'utf8').trim();
// Ensure fill color is rgb(255,240,202) (the warm cream color)
let cleanSerifSvg = serifSvg;
if (!cleanSerifSvg.includes('fill=')) {
  cleanSerifSvg = cleanSerifSvg.replace('<path d=', '<path fill="rgb(255,240,202)" d=');
}

// Create encoded data URI for CSS
const encodedSerifDataUri = encodeURIComponent(cleanSerifSvg)
  .replace(/'/g, '%27')
  .replace(/"/g, '%22');

console.log('Clean serif SVG length:', cleanSerifSvg.length);
console.log('Encoded URI length:', encodedSerifDataUri.length);

// 2. Read open-earth-lawn.html
let lawnHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Replace any occurrence of the Lay Grotesk <text> SVG data URI in lawnHtml
const badSvgPattern = /data:image\/svg\+xml,[^"'\)]*?Lay%20Grotesk[^"'\)]*/g;
const matchCount = (lawnHtml.match(badSvgPattern) || []).length;
console.log('Found bad Lay Grotesk SVG occurrences in lawnHtml:', matchCount);

lawnHtml = lawnHtml.replace(badSvgPattern, `data:image/svg+xml,${encodedSerifDataUri}`);

// Also check for unencoded "Lay Grotesk" inside svg in lawnHtml
const unencodedBadPattern = /data:image\/svg\+xml,&lt;svg[^&]*?Lay Grotesk[^&]*?&lt;\/svg&gt;/g;
const unencodedCount = (lawnHtml.match(unencodedBadPattern) || []).length;
console.log('Found unencoded bad SVG occurrences:', unencodedCount);
lawnHtml = lawnHtml.replace(unencodedBadPattern, `data:image/svg+xml,${cleanSerifSvg.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}`);

// Also ensure .framer-xj8hz2 in universal-grand-footer-styles uses the serif vector
const cssRuleStart = lawnHtml.indexOf('.framer-xj8hz2 {');
if (cssRuleStart !== -1) {
  const cssRuleEnd = lawnHtml.indexOf('}', cssRuleStart);
  console.log('Existing .framer-xj8hz2 CSS rule:', lawnHtml.slice(cssRuleStart, cssRuleEnd + 1));
}

// Write to test file first
fs.writeFileSync('venues/open-earth-lawn.html', lawnHtml, 'utf8');
console.log('Updated venues/open-earth-lawn.html successfully!');
