import fs from 'fs';

const lawnHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

const mH1 = [...lawnHtml.matchAll(/<h1[\s\S]*?<\/h1>/gi)];
mH1.forEach((h, i) => {
  console.log(`\n=== H1 ${i} ===`);
  console.log(h[0]);
});
