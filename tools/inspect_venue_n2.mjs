import fs from 'fs';

const html = fs.readFileSync('venues/venue-n2.html', 'utf8');

console.log('venues/venue-n2.html length:', html.length);
const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
console.log('Title:', titleMatch ? titleMatch[1] : 'none');

// Check header
const headers = html.match(/<header[\s\S]*?<\/header>/gi) || [];
console.log('Headers count:', headers.length);

// Check footer
const footers = html.match(/<footer[\s\S]*?<\/footer>/gi) || [];
console.log('Footers count:', footers.length);
if (footers.length > 0) {
  console.log('Footer length:', footers[0].length);
  console.log('Footer class:', (footers[0].match(/class="([^"]+)"/) || [])[1]);
}

// Check style tags
const styles = html.match(/<style[^>]*>/gi) || [];
console.log('Styles count:', styles.length);
styles.forEach(s => console.log(' ', s));
