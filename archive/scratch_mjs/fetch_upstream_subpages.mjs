import fs from 'fs';

const pages = [
  { slug: 'boutique-n1', venue: 'venue-n1', url: 'https://www.casamomo.at/apartments/boutique-n1' },
  { slug: 'boutique-n2', venue: 'venue-n2', url: 'https://www.casamomo.at/apartments/boutique-n2' },
  { slug: 'boutique-n3', venue: 'venue-n3', url: 'https://www.casamomo.at/apartments/boutique-n3' },
  { slug: 'boutique-n4', venue: 'venue-n4', url: 'https://www.casamomo.at/apartments/boutique-n4' },
  { slug: 'loft-n1', venue: 'venue-n5', url: 'https://www.casamomo.at/apartments/loft-n1' }
];

async function fetchAll() {
  for (const p of pages) {
    console.log(`Fetching upstream for ${p.slug} from ${p.url}...`);
    try {
      const res = await fetch(p.url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      if (res.ok) {
        const text = await res.text();
        const savePath = `C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/upstream_${p.slug}.html`;
        fs.writeFileSync(savePath, text, 'utf8');
        console.log(`Saved ${p.slug} (${text.length} bytes) to ${savePath}`);
      } else {
        console.error(`Failed ${p.slug}: HTTP ${res.status}`);
      }
    } catch (e) {
      console.error(`Error fetching ${p.slug}:`, e.message);
    }
  }
}

fetchAll();
