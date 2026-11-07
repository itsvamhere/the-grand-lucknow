import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');
const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const homeFooterMatch = homeHtml.match(/<footer[\s\S]*?<\/footer>/i)[0];
const subFooterMatch = subHtml.match(/<footer[\s\S]*?<\/footer>/i)[0];

function extractMenuLinks(htmlStr, label) {
  console.log(`=== ${label} MENU LINKS ===`);
  const regex = /<p[^>]*class="[^"]*framer-text[^"]*"[^>]*>([\s\S]*?)<\/p>/gi;
  let match;
  while ((match = regex.exec(htmlStr)) !== null) {
    if (match[1].includes('Venues') || match[1].includes('About') || match[1].includes('Contact') || match[1].includes('Instagram') || match[1].includes('Facebook')) {
      console.log('Found link markup snippet:\n', match[0].slice(0, 400));
      console.log('---');
    }
  }
}

extractMenuLinks(homeFooterMatch, 'HOME');
extractMenuLinks(subFooterMatch, 'SUBPAGE');
