const fs = require('fs');
const subHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

// Search for Other Venues or Venues Grid or card_2 or card_3 or svg placeholder
const terms = ['Other Venues', 'grassland-gala', 'garden-galaxy', 'card_2', 'card_3', 'data:image/svg'];
terms.forEach(t => {
  let idx = 0;
  let count = 0;
  while ((idx = subHtml.indexOf(t, idx)) !== -1) {
    count++;
    if (count <= 3) {
      console.log(`Term "${t}" match ${count} at pos ${idx}:`);
      console.log(subHtml.substring(Math.max(0, idx - 150), Math.min(subHtml.length, idx + 350)));
      console.log('---');
    }
    idx += t.length;
  }
  if (count === 0) console.log(`Term "${t}": 0 matches`);
});
