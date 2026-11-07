import fs from 'node:fs';

const htmlPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html';
const svgPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_vector_map.svg';

let html = fs.readFileSync(htmlPath, 'utf8');
const svg = fs.readFileSync(svgPath, 'utf8');

// 1. Remove maplibre css and js from <head>
html = html.replace(/<link rel="stylesheet" href="https:\/\/unpkg\.com\/maplibre-gl[^"]+" \/>\s*/g, '');
html = html.replace(/<script src="https:\/\/unpkg\.com\/maplibre-gl[^"]+"><\/script>\s*/g, '');

// 2. Replace grand-subpage-map-styles
const newStyles = `<style id="grand-subpage-map-styles">
  #subpage-vector-map {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    background: #FFF0CA;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  #subpage-vector-map svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
</style>`;

html = html.replace(/<style id="grand-subpage-map-styles">[\s\S]*?<\/style>/, newStyles);

// 3. Insert static SVG directly into <div id="subpage-vector-map">
html = html.replace(
  '<div id="subpage-vector-map"></div>',
  `<div id="subpage-vector-map">${svg}</div>`
);

// 4. Remove grand-subpage-map-init script
html = html.replace(/<script id="grand-subpage-map-init">[\s\S]*?<\/script>\s*/, '');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully updated open-earth-lawn.html with static vector map!');
