import fs from 'fs';

const lawnHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

const headers = lawnHtml.match(/<header[\s\S]*?<\/header>/g);
console.log('Headers count:', headers.length);
headers.forEach((h, i) => {
  const openTag = h.match(/<header[^>]*>/)[0];
  const classes = h.match(/class="([^"]*)"/)?.[1];
  console.log(`Header ${i}:`, openTag.slice(0, 150));
  console.log(`Parent or responsive context:`, h.slice(0, 300));
});
