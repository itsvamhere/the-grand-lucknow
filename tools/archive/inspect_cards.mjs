import fs from 'fs';

const lines = fs.readFileSync('venues/open-earth-lawn.html', 'utf8').split('\n');
const line1125 = lines[1124];
console.log('Line 1125 length:', line1125.length);

const links = line1125.match(/href="[^"]*"/g);
console.log('Links in line 1125:', links);

const imgs = line1125.match(/src="[^"]*"/g);
console.log('Images in line 1125:', imgs);

// Let's also look for text content like Open Earth Lawn N or Grassland or Garden
const pMatches = line1125.match(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/g);
console.log('Headings in line 1125:', pMatches);
