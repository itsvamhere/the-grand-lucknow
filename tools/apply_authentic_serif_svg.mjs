import fs from 'fs';

// 1. Read authentic serif vector SVG
const serifSvg = fs.readFileSync('tools/archive/the_grand_footer_desktop.svg', 'utf8').trim();
// Make sure path fill is rgb(255,240,202)
let cleanSvg = serifSvg;
if (!cleanSvg.includes('fill=')) {
  cleanSvg = cleanSvg.replace('<path d=', '<path fill="rgb(255,240,202)" d=');
}

// URL-encode properly
const encodedSvg = encodeURIComponent(cleanSvg);

// 2. Read lawn HTML
let lawn = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Target the bad rule
const targetStr = `background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewBox%3D%220%200%202404.809%20300.206%22%20overflow%3D%22visible%22%3E%3Ctext%20x%3D%2250%25%22%20y%3D%22225%22%20text-anchor%3D%22middle%22%20font-family%3D%22'Lay%20Grotesk%20Regular'%2C%20sans-serif%22%20font-size%3D%22192%22%20font-weight%3D%22700%22%20letter-spacing%3D%220.08em%22%20fill%3D%22var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2%2C%20rgb(243%2C%20236%2C%20221))%22%3ETHE%20GRAND%3C%2Ftext%3E%3C%2Fsvg%3E") !important;`;

if (!lawn.includes(targetStr)) {
  console.log('Target string not found directly! Let us inspect around 333565.');
} else {
  console.log('Target string found! Replacing with authentic serif vector SVG...');
  const replacementStr = `background-image: url("data:image/svg+xml,${encodedSvg}") !important;`;
  lawn = lawn.replace(targetStr, replacementStr);
  fs.writeFileSync('venues/open-earth-lawn.html', lawn, 'utf8');
  console.log('Replacement written successfully!');
}
