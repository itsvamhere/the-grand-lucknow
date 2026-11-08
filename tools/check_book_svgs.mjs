import fs from 'fs';

const html = fs.readFileSync('book/venue.html', 'utf8');

const tStart = html.indexOf('id="svg-templates"');
if (tStart !== -1) {
  const tEnd = html.indexOf('</svg>', tStart) + 6;
  console.log('svg-templates snippet:\n', html.slice(tStart, tStart + 600));
} else {
  console.log('svg-templates not found');
}

// Also check where svg-1334768056_3843 is defined
const sIdx = html.indexOf('svg-1334768056_3843');
console.log('svg-1334768056_3843 index:', sIdx);
if (sIdx !== -1) {
  console.log(html.slice(sIdx - 50, sIdx + 400));
}
