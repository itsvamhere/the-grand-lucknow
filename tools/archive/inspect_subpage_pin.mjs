import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find map pin element in subHtml
const mapSecIdx = subHtml.indexOf('subpage-vector-map');
console.log('subpage-vector-map index:', mapSecIdx);
if (mapSecIdx !== -1) {
  console.log('Snippet of subpage map:\n', subHtml.slice(mapSecIdx, mapSecIdx + 1200));
}

// Find style for map pin
const pinStyleMatch = subHtml.match(/grand-map-pin[\s\S]*?<\/style>/i) || subHtml.match(/badge[\s\S]{0,300}/i);
console.log('Pin style snippet:\n', pinStyleMatch ? pinStyleMatch[0].slice(0, 500) : 'None');
