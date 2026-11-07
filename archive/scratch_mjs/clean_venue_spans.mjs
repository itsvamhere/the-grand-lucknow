import fs from 'fs';

let content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html', 'utf8');

// 1. Title and meta
content = content.replace(/Venue N°2 • Designer Apartment in Lucknow • The Grand/g, 'Venue N°2 • Premier Celebration Venue in Lucknow • The Grand');
content = content.replace(/Designer Apartment in Lucknow/g, 'Premier Celebration Venue in Lucknow');
content = content.replace(/Personally designed apartments/g, 'Personally designed celebration venues');

// 2. Animated split spans for "Boutique" -> "Venue"
// Replace >Boutique</span> with >Venue</span>
content = content.replaceAll('>Boutique</span>', '>Venue</span>');

// 3. Metric & area: 20,000 sq ft -> 14,000 sq ft
content = content.replaceAll('>sq ft</span>', '>sq ft</span>');
content = content.replaceAll('>45</span>', '>14,000</span>');

// 4. Eradicate LinkedIn from venue-n2.html footer
content = content.replaceAll('https://www.facebook.com/thegrandlucknow/', 'https://www.facebook.com/thegrandlucknow/');
content = content.replaceAll('https://www.facebook.com/thegrandlucknow/', 'https://www.facebook.com/thegrandlucknow/');

// Replace LinkedIn rolling letters with Facebook letters if present
const linkedinRollingPattern = /<span data-rolling-label[^>]*>(?:(?!<\/span><\/span><\/div>).)*?LinkedIn.*?<\/span>/s;
// Let's replace the letters L-i-n-k-e-d-I-n with F-a-c-e-b-o-o-k
function makeRollingWord(word) {
  let html = `<span style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0">${word}</span>`;
  for (const ch of word) {
    html += `<span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden">${ch}</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none">${ch}</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)">${ch}</span></span>`;
  }
  return html;
}

const fbRolling = makeRollingWord('Facebook');

// Find and replace the inner content of data-rolling-label that has Facebook or LinkedIn
content = content.replace(/(<span data-rolling-label[^>]*>)(?:<span style="position:absolute[^>]*>(?:Facebook|LinkedIn)<\/span>.*?)(<\/span><\/div>)/gs, (match, prefix, suffix) => {
  return `${prefix}${fbRolling}${suffix}`;
});

// Also ensure Built by Edifice is present in footer
content = content.replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice');
content = content.replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice');
content = content.replaceAll('Built by Nexene', 'Built by Edifice');
content = content.replaceAll('Built by', 'Built by');
content = content.replaceAll('Nexene', 'Edifice');

fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html', content, 'utf8');
fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/boutique-n2.html', content, 'utf8');

console.log('Successfully updated venues/venue-n2.html and venues/boutique-n2.html');
