import fs from 'fs';

const orig = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/casamomo_boutique_n1_original.html', 'utf8');

// Look for Color Change component or background transitions in orig
const matches = orig.match(/data-framer-name="Color Change"[^>]*>[\s\S]{0,500}/g);
if (matches) {
  matches.forEach((m, i) => console.log(`Match ${i}:\n`, m.slice(0, 300)));
} else {
  console.log('No Color Change component found in orig');
}

// Let's check how body background is handled in orig
const bodyBgMatches = orig.match(/background(?:-color)?\s*:\s*var\(--token-[^;]+;/g);
console.log('Body bg token matches:', bodyBgMatches ? bodyBgMatches.slice(0, 5) : null);
