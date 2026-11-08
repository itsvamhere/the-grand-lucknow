import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');

const textSvgIdx = homeHtml.indexOf('font-family="\'Lay Grotesk Regular\'');
if (textSvgIdx !== -1) {
  console.log('Found Lay Grotesk SVG in index.html at', textSvgIdx);
  console.log(homeHtml.substring(textSvgIdx - 150, textSvgIdx + 300));
} else {
  console.log('Not found');
}
