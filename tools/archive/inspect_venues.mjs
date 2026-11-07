import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

// Find all image tags and venue names in index.html
const venues = ['Open Earth Lawn', 'Grassland Gala', 'Garden Galaxy', 'The Grand Courtyard', 'The Royal Legacy Banquet'];
for (const v of venues) {
  const idx = html.indexOf(v);
  console.log(`Venue: ${v}, index: ${idx}`);
  if (idx !== -1) {
    const chunk = html.slice(Math.max(0, idx - 1000), Math.min(html.length, idx + 1000));
    const imgs = chunk.match(/<img[^>]+>/g);
    console.log(`Images near ${v}:`, imgs);
  }
}
