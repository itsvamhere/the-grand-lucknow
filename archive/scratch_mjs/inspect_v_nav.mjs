import fs from 'fs';

const v = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html', 'utf8');

const navMatch = v.match(/<nav[\s\S]*?<\/nav>/i);
if (navMatch) {
  console.log('Venue nav:', navMatch[0]);
} else {
  console.log('No <nav> tag found, checking framer-uYnNg');
  const uyn = v.match(/class="[^"]*framer-uYnNg[^"]*"[\s\S]{0,1000}/);
  console.log(uyn ? uyn[0] : 'not found');
}
