import fs from 'fs';

const masterHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Check Venue Lists in masterHtml
const vListsStart = masterHtml.indexOf('<div class="framer-2iif9c" data-framer-name="Venue Lists">');
const vListsEnd = masterHtml.indexOf('<footer class="framer-18na9ah"', vListsStart);

console.log('Venue Lists Start:', vListsStart, 'End:', vListsEnd);
console.log('Does masterHtml have card_1_open_earth inside vlist?', masterHtml.slice(vListsStart, vListsEnd).includes('card_1_open_earth'));
console.log('Does masterHtml have card_2_grassland_gala inside vlist?', masterHtml.slice(vListsStart, vListsEnd).includes('card_2_grassland_gala'));
console.log('Does masterHtml have card_3_ballroom inside vlist?', masterHtml.slice(vListsStart, vListsEnd).includes('card_3_ballroom'));
