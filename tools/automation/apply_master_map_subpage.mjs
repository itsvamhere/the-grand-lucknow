import fs from 'node:fs';

const htmlPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Update #grand-subpage-map-styles
const mapStyles = `<style id="grand-subpage-map-styles">
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
  #subpage-vector-map img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    user-select: none;
    -webkit-user-drag: none;
    mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent),
                linear-gradient(transparent, black 12%, black 88%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent),
                        linear-gradient(transparent, black 12%, black 88%, transparent);
    mask-composite: source-in;
    -webkit-mask-composite: source-in;
  }
</style>`;

html = html.replace(/<style id="grand-subpage-map-styles">[\s\S]*?<\/style>/, mapStyles);

// Update #subpage-vector-map inner content to use the master cartographic asset with srcset
const mapContent = `<div id="subpage-vector-map">
  <img src="/images/the_grand_lucknow_master_map_1920.png"
       srcset="/images/the_grand_lucknow_master_map_1920.png 1920w, /images/the_grand_lucknow_master_map.png 3840w"
       sizes="100vw"
       alt="Cartographic map showing The Grand Lucknow location"
       loading="eager"
       decoding="async" />
</div>`;

html = html.replace(/<div id="subpage-vector-map">[\s\S]*?<\/div>/, mapContent);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully updated open-earth-lawn.html with master cartographic map!');
