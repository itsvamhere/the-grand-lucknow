import fs from 'fs';

const vlist = fs.readFileSync('tools/vlist_block.html', 'utf8');

// Check Card 1 and Card 2
const card1Match = vlist.match(/<div class="framer-9du0n0" data-framer-name="Venue List">([\s\S]*?)<\/div>\s*<div class="framer-1acjp8y"/);
const card2Match = vlist.match(/<div class="framer-1acjp8y" data-framer-name="Venue List">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/);

console.log('Card 1 matched:', !!card1Match);
console.log('Card 2 matched:', !!card2Match);
