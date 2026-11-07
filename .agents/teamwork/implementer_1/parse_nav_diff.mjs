import fs from 'fs';

const idxH = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/implementer_1/full_idx_header.html', 'utf8');
const lawnH = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/implementer_1/full_lawn_header.html', 'utf8');

// Compare links in both
function extractLinks(html) {
  const links = [...html.matchAll(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)].map(m => {
    const textMatch = m[2].match(/<span[^>]*>([^<]+)<\/span>/);
    return {
      href: m[1],
      fullText: m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    };
  });
  return links;
}

console.log('INDEX LINKS:', JSON.stringify(extractLinks(idxH), null, 2));
console.log('LAWN LINKS:', JSON.stringify(extractLinks(lawnH), null, 2));
