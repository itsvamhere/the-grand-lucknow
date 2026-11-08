import fs from 'fs';

const html = fs.readFileSync('venues/grassland-gala.html', 'utf8');
console.log('Title:', html.match(/<title>(.*?)<\/title>/)?.[1]);
console.log('H1:', html.match(/<h1[^>]*>(.*?)<\/h1>/)?.[1]);

const desc = html.match(/data-framer-name="Description"[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/)?.[1];
console.log('Desc:', desc?.slice(0, 150));

const imgs = [...html.matchAll(/<img[^>]+src="([^">]+)"/g)].map(m => m[1]);
console.log('Images in file (first 10):', imgs.slice(0, 10));

// Check venue lists section
const venueLists = html.match(/data-framer-name="Venue Lists"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/)?.[0] || '';
console.log('Venue list links:', [...html.matchAll(/href="([^"]*venues\/[^"]*)"/g)].map(m => m[1]));
