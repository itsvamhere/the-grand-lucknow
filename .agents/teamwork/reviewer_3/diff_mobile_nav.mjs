import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf-8');
const origContent = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/casamomo_boutique_n1_original.html', 'utf-8');

function extractMobile(html) {
  const match = html.match(/<div class="framer-keuai4-container[^>]*>([\s\S]*?)<\/div>\s*<\/header>/);
  return match ? match[0] : 'None';
}

console.log('Lawn Mobile Navbar length:', extractMobile(content).length);
console.log('Orig Mobile Navbar length:', extractMobile(origContent).length);

// Let's see if there are diffs in the mobile navbar:
fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/reviewer_3/lawn_mob_nav.html', extractMobile(content));
fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/reviewer_3/orig_mob_nav.html', extractMobile(origContent));
console.log('Written to lawn_mob_nav.html and orig_mob_nav.html');
