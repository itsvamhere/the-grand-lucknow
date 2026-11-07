const fs = require('fs');

const indexHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');
const venueHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n1.html', 'utf8');

function checkNav(name, html) {
  const nav = html.match(/<nav[^>]*>[\s\S]*?<\/nav>/i);
  console.log(`=== ${name} ===`);
  if (!nav) {
    console.log('No <nav> tag found');
    return;
  }
  const text = nav[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log('Text:', text);
  // find all links in nav
  const links = Array.from(nav[0].matchAll(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)).map(m => ({
    href: m[1],
    text: m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  }));
  console.log('Links:', JSON.stringify(links, null, 2));
}

checkNav('index.html', indexHtml);
checkNav('venues/venue-n1.html', venueHtml);
