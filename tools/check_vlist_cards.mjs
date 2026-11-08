import fs from 'fs';

const h = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const vListsStart = h.indexOf('<div class="framer-2iif9c" data-framer-name="Venue Lists">');
const vListsEnd = h.indexOf('<footer class="framer-18na9ah"', vListsStart);
const vlist = h.slice(vListsStart, vListsEnd);

console.log('vlist length:', vlist.length);
const [c1, c2] = vlist.split('<div class="framer-1acjp8y" data-framer-name="Venue List">');
console.log('c1 length:', c1?.length, 'c2 length:', c2?.length);

const c1Nums = c1.match(/<p class="framer-text framer-styles-preset-12u2lkp"[^>]*>([\d,]+)<\/p>/g);
console.log('c1 numbers:', c1Nums);

const c2Nums = c2.match(/<p class="framer-text framer-styles-preset-12u2lkp"[^>]*>([\d,]+)<\/p>/g);
console.log('c2 numbers:', c2Nums);
