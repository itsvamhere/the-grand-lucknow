import fs from 'fs';

function updateFileTo5Venues(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');

  const gridStart = html.indexOf('<section class="framer-mefgjz" data-framer-name="Venues Grid"');
  const gridEnd = html.indexOf('</section>', gridStart);
  if (gridStart === -1 || gridEnd === -1) {
    console.error(`Grid section not found in ${filePath}`);
    return;
  }

  const gridContent = html.slice(gridStart, gridEnd);
  const items = gridContent.split(/(?=<div class="framer-fdgjuz" data-framer-name="Venue Item">)/);
  console.log(`${filePath} split into ${items.length} pieces`);

  if (items.length < 6) {
    console.log(`${filePath} already has 5 or fewer items`);
    return;
  }

  // Update Item 3 to Garden Galaxy
  let item3 = items[3];
  item3 = item3.replace(/href="[^"]*venues\/[^"]*"/g, 'href="./venues/garden-galaxy"');
  item3 = item3.replace(/\/images\/[^"]*\.(?:webp|png|jpg|jpeg)/g, '/images/card_3_ballroom.webp');
  item3 = item3.replace(/alt="[^"]*"/g, 'alt="Garden Galaxy"');
  item3 = item3.replace(/(<p class="framer-text[^>]*>)[\d,]+(<\/p>)/, '$115,000$2');
  item3 = item3.replace(/(<div class="framer-1a6x07d"[\s\S]*?<p class="framer-text[^>]*>)[\d,]+(<\/p>)/, '$1300$2');

  // Update Item 4 to The Grand Courtyard
  let item4 = items[4];
  item4 = item4.replace(/href="[^"]*venues\/[^"]*"/g, 'href="./venues/the-grand-courtyard"');
  item4 = item4.replace(/\/images\/[^"]*\.(?:webp|png|jpg|jpeg)/g, '/images/card_4_courtyard.webp');
  item4 = item4.replace(/alt="[^"]*"/g, 'alt="The Grand Courtyard"');
  item4 = item4.replace(/(<p class="framer-text[^>]*>)[\d,]+(<\/p>)/, '$115,000$2');
  item4 = item4.replace(/(<div class="framer-1a6x07d"[\s\S]*?<p class="framer-text[^>]*>)[\d,]+(<\/p>)/, '$1250$2');

  // Update Item 5 to The Royal Legacy Banquet
  let item5 = items[5];
  item5 = item5.replace(/href="[^"]*venues\/[^"]*"/g, 'href="./venues/the-royal-legacy-banquet"');
  item5 = item5.replace(/\/images\/[^"]*\.(?:webp|png|jpg|jpeg)/g, '/images/card_5_garden_pavilion.webp');
  item5 = item5.replace(/alt="[^"]*"/g, 'alt="The Royal Legacy Banquet"');
  item5 = item5.replace(/(<p class="framer-text[^>]*>)[\d,]+(<\/p>)/, '$110,000$2');
  item5 = item5.replace(/(<div class="framer-1a6x07d"[\s\S]*?<p class="framer-text[^>]*>)[\d,]+(<\/p>)/, '$1600$2');

  // Ensure Item 5 closes the container cleanly
  // In Casa Momo, the 5th item ends with </div><!--/$--></div>
  if (!item5.endsWith('<!--/$--></div>')) {
    item5 = item5.trimEnd() + '<!--/$--></div>';
  }

  // Construct new 5-venue grid
  const newGridContent = items[0] + items[1] + items[2] + item3 + item4 + item5;
  html = html.slice(0, gridStart) + newGridContent + html.slice(gridEnd);

  // Update client-side synchronization script in index.html if present
  const fiveVenuesJs = `var venues = [
    { href: '/venues/open-earth-lawn', name: 'Open Earth Lawn' },
    { href: '/venues/grassland-gala', name: 'Grassland Gala' },
    { href: '/venues/garden-galaxy', name: 'Garden Galaxy' },
    { href: '/venues/the-grand-courtyard', name: 'The Grand Courtyard' },
    { href: '/venues/the-royal-legacy-banquet', name: 'The Royal Legacy Banquet' }
  ];`;

  html = html.replace(/var venues = \[[\s\S]*?\];/m, fiveVenuesJs);

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Successfully updated ${filePath} to 5 verified venues!`);
}

updateFileTo5Venues('index.html');
updateFileTo5Venues('venues.html');
