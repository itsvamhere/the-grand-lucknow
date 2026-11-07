const fs = require('fs');

function inspect(name, p) {
  if (!fs.existsSync(p)) {
    console.log(`[${name}] does not exist at ${p}`);
    return;
  }
  const html = fs.readFileSync(p, 'utf8');
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  console.log(`\n=== ${name} (${p}) ===`);
  console.log('Title:', titleMatch ? titleMatch[1] : 'none');
  console.log('H1:', h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'none');
  console.log('Includes script_main:', html.includes('script_main'));
  console.log('Includes __framer__handoverData:', html.includes('__framer__handoverData'));
  console.log('Includes "Sorry, this page":', html.includes("Sorry, this page"));
  console.log('Includes "Page Not Found":', html.includes("Page Not Found"));
  console.log('File size:', html.length, 'bytes');
}

inspect('boutique-n1.html', 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/boutique-n1.html');
inspect('casamomo_boutique_n1_original.html', 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/casamomo_boutique_n1_original.html');
inspect('venue-n1.html', 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n1.html');
inspect('open-earth-lawn.html', 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html');
