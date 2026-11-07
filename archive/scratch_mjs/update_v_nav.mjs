import fs from 'fs';

let html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html', 'utf8');

// Function to generate rolling word markup
function makeRollingWord(word) {
  let res = `<span style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0">${word}</span>`;
  for (const ch of word) {
    res += `<span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden">${ch}</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none">${ch}</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)">${ch}</span></span>`;
  }
  return res;
}

const venuesRolling = makeRollingWord('Venues');
const inquireRolling = makeRollingWord('Inquire Now');

// Replace Apartments nav link
html = html.replace(/href="\.\.\/apartments"/g, 'href="/venues"');
html = html.replace(/href="\/apartments"/g, 'href="/venues"');
html = html.replace(/<span style="position:absolute[^>]*>Apartments<\/span>.*?<\/span><!--\/\$-->/s, `${venuesRolling}<!--/$-->`);

// Replace Book Now in nav
html = html.replace(/<span style="position:absolute[^>]*>Book Now<\/span>.*?<\/span><!--\/\$-->/s, `${inquireRolling}<!--/$-->`);
html = html.replace(/href="\.\.\/book"/g, 'href="javascript:void(0)" onclick="window.openGrandModal && window.openGrandModal()"');

fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html', html, 'utf8');
fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/boutique-n2.html', html, 'utf8');
console.log('Nav updated successfully in venue-n2.html');
