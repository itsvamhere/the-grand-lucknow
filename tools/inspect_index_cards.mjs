import fs from 'fs';

const h = fs.readFileSync('index.html', 'utf8');

// Find all venue cards in index.html
const cardRegex = /<div class="framer-[^"]*" data-framer-name="Venue Card"[\s\S]*?<\/div><\/div><\/div>/g;
// Or let's search for venue names in index.html
const names = ['Open Earth Lawn', 'Grassland Gala', 'Garden Galaxy', 'The Grand Courtyard', 'The Royal Legacy Banquet'];

names.forEach(name => {
  const idx = h.indexOf(name);
  if (idx !== -1) {
    console.log('===', name, '===');
    console.log(h.slice(idx - 200, idx + 600));
  } else {
    console.log('NOT FOUND in index.html:', name);
  }
});
