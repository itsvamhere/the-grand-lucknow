import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find headings like Venue Details, Features, Description, Other Places
const h2s = [...html.matchAll(/<h2[^>]*style="([^"]*)"[^>]*>([\s\S]*?)<\/h2>/g)];
h2s.forEach((h, i) => {
  const style = h[1];
  const text = h[2].replace(/<[^>]+>/g, '').trim();
  const color = style.match(/color:([^;]+)/)?.[1];
  console.log(`H2 ${i + 1}: "${text}" -> color: ${color}`);
});
