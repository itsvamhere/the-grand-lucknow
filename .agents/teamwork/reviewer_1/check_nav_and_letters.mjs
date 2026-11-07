import fs from 'fs';

const lawnHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');
const idxHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

function inspectHeader(html, label) {
  const headerMatch = html.match(/<header[\s\S]*?<\/header>/g);
  console.log(`=== ${label} Headers: ${headerMatch ? headerMatch.length : 0} ===`);
  if (!headerMatch) return;
  headerMatch.forEach((h, i) => {
    const links = [...h.matchAll(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)].map(m => ({
      href: m[1],
      framerName: m[0].match(/data-framer-name="([^"]*)"/)?.[1],
      classes: m[0].match(/class="([^"]*)"/)?.[1],
      text: m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    }));
    console.log(`Header ${i}:`, JSON.stringify(links, null, 2));
  });
}

inspectHeader(idxHtml, 'INDEX.HTML');
inspectHeader(lawnHtml, 'OPEN-EARTH-LAWN.HTML');
