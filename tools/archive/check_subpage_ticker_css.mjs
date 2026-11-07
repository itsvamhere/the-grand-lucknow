import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const tStyles = subHtml.match(/grand-ticker[\s\S]*?<\/style>/i);
console.log('=== TICKER STYLES IN SUBPAGE ===');
console.log(tStyles ? tStyles[0] : 'None');
