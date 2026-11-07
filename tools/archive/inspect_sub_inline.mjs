import fs from 'fs';

const sub = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const footerMatch = sub.match(/<footer[\s\S]*?<\/footer>/)[0];

const op0 = (footerMatch.match(/opacity:\s*0[;\"]/g) || []).length;
const op1 = (footerMatch.match(/opacity:\s*1[;\"]/g) || []).length;
console.log('In subpage footer: opacity: 0 count:', op0, 'opacity: 1 count:', op1);
