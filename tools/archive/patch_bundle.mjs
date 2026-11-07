import fs from 'fs';

const p = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs';
let content = fs.readFileSync(p, 'utf8');

// 1. Heading Locations -> Location
console.log('Replacing Locations heading...');
content = content.replace('text:`Locations`', 'text:`Location`');

// 2. Address & body
console.log('Replacing Address...');
content = content.replace(
  /text:`The Grand is located in the prestigious Gomti Nagar area of Lucknow[^\`]*`/,
  'text:`22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301`'
);

// Also replace Gomti Nagar occurrences
content = content.replaceAll('Gomti Nagar', 'Bindaua, Raibareli Rd');

// 3. Button 'Inquire Now' -> 'Open in Maps ↗'
console.log('Replacing Inquire Now...');
content = content.replace('h4U9KDnPX:`Inquire Now`', 'h4U9KDnPX:`Open in Maps ↗`');

// 4. Update the links array for the button
console.log('Replacing links...');
const oldLinksPattern = /links:\[\{href:\{webPageId:`Vx10SpHD8`\}[^\}]*\},[^\]]*\]/;
if (oldLinksPattern.test(content)) {
  content = content.replace(
    oldLinksPattern,
    'links:[{href:`https://maps.app.goo.gl/94Dr1K1iPbZ3kR117`,openInNewTab:!0},{href:`https://maps.app.goo.gl/94Dr1K1iPbZ3kR117`,openInNewTab:!0},{href:`https://maps.app.goo.gl/94Dr1K1iPbZ3kR117`,openInNewTab:!0}]'
  );
}

fs.writeFileSync(p, content, 'utf8');
console.log('Successfully updated JS bundle!');
