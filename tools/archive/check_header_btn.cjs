const fs = require('fs');

function checkHeaderBtn(file) {
  const p = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/' + file;
  const html = fs.readFileSync(p, 'utf8');
  console.log(`=== HEADER IN ${file} ===`);
  const headerMatch = html.match(/<header[\s\S]*?<\/header>/) || html.match(/<nav[\s\S]*?<\/nav>/);
  if (headerMatch) {
    console.log(headerMatch[0].substring(0, 800));
  } else {
    // find the top fixed container with logo and nav
    const topBar = html.match(/<div class="framer-1dc0xew[\s\S]*?<\/header>/) || html.match(/<div[^>]*data-framer-name="Desktop"[^>]*>[\s\S]*?<\/div>/);
    console.log('Top bar match:', topBar ? topBar[0].substring(0, 500) : 'Not found');
  }
}

checkHeaderBtn('index.html');
checkHeaderBtn('venues/venue-n1.html');
