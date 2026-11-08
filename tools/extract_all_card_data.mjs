import fs from 'fs';

const html = fs.readFileSync('venues.html', 'utf8');

const regex = /<a[^>]*href="(?:\.\/|\/)?venues\/([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
let match;
const venuesData = [];
while ((match = regex.exec(html)) !== null) {
  const slug = match[1];
  const inner = match[2];
  // extract text content
  const texts = inner.replace(/<[^>]+>/g, '\n')
    .split('\n')
    .map(t => t.trim())
    .filter(t => t.length > 0);
  venuesData.push({ slug, texts });
}

console.log('Extracted venues count:', venuesData.length);
venuesData.forEach(v => {
  console.log(`\nSlug: ${v.slug}`);
  console.log('Texts:', v.texts);
});
