import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const vListsStart = html.indexOf('<div class="framer-2iif9c" data-framer-name="Venue Lists">');
const vListsEnd = html.indexOf('</style>\n\n<footer class="framer-18na9ah"');
console.log('vLists region length:', vListsEnd - vListsStart);
const vListsHtml = html.slice(vListsStart, vListsEnd);

// Find where each card starts and ends
const card1Start = vListsHtml.indexOf('<div class="framer-1jnzc16"');
const card2Start = vListsHtml.indexOf('<div class="framer-1jnzc16"', card1Start + 1);
console.log('Card 1 start:', card1Start, 'Card 2 start:', card2Start);

console.log('Card 1 snippet:', vListsHtml.slice(card1Start, card1Start + 500));
console.log('Card 2 snippet:', vListsHtml.slice(card2Start, card2Start + 500));
