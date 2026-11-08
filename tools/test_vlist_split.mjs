import fs from 'fs';

const masterHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const vListsStart = masterHtml.indexOf('<div class="framer-2iif9c" data-framer-name="Venue Lists">');
const vListsEnd = masterHtml.indexOf('<footer class="framer-18na9ah"', vListsStart);
let vlist = masterHtml.slice(vListsStart, vListsEnd);

let [c1Div, c2Div] = vlist.split('<div class="framer-1acjp8y" data-framer-name="Venue List">');
console.log('c1Div length:', c1Div?.length, 'c2Div length:', c2Div?.length);

// Card 1 on c1Div: Grassland Gala -> Grand Ballroom
c1Div = c1Div.replace(/href="\/venues\/grassland-gala"/g, '/venues/grand-ballroom');
c1Div = c1Div.replace(/\/images\/card_2_grassland_gala\.webp/g, '/images/card_3_ballroom.webp');
c1Div = c1Div.replace(/alt="Grassland Gala"/g, 'alt="Grand Ballroom"');
c1Div = c1Div.replace(/(rotate\(8deg\)">)Grassland Gala(<\/span><\/span> <\/h2>)/g, '$1Grand Ballroom$2');

// Card 2 on c2Div: Garden Galaxy -> The Courtyard
c2Div = c2Div.replace(/href="\/venues\/garden-galaxy"/g, '/venues/the-courtyard');
c2Div = c2Div.replace(/\/images\/card_3_ballroom\.webp/g, '/images/card_4_courtyard.webp');
c2Div = c2Div.replace(/alt="Garden Galaxy"/g, 'alt="The Courtyard"');
c2Div = c2Div.replace(/(rotate\(8deg\)">)Garden Galaxy(<\/span><\/span> <\/h2>)/g, '$1The Courtyard$2');

vlist = c1Div + '<div class="framer-1acjp8y" data-framer-name="Venue List">' + c2Div;

const cardImgs = [...vlist.matchAll(/<img[^>]+src="([^">]+)"/g)].map(m => m[1]);
console.log('Cards in vlist now:', cardImgs);
console.log('Links in vlist now:', [...vlist.matchAll(/href="([^"]+)"/g)].map(m => m[1]));
