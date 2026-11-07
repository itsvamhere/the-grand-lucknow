import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf-8');
const origContent = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/casamomo_boutique_n1_original.html', 'utf-8');

const hLawn = content.match(/<header[\s\S]*?<\/header>/gi);
const hOrig = origContent.match(/<header[\s\S]*?<\/header>/gi);

console.log('Lawn headers count:', hLawn.length);
console.log('Orig headers count:', hOrig.length);

hLawn.forEach((h, i) => {
  console.log(`Lawn Header ${i} length: ${h.length}`);
  const containers = h.match(/class="[^"]*container[^"]*"/g);
  console.log(`  Containers in Header ${i}:`, containers);
});

hOrig.forEach((h, i) => {
  console.log(`Orig Header ${i} length: ${h.length}`);
  const containers = h.match(/class="[^"]*container[^"]*"/g);
  console.log(`  Containers in Header ${i}:`, containers);
});
