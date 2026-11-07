import fs from 'node:fs';

const htmlPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Update #grand-subpage-map-styles to make map big, immersive, and full-bleed
const mapStyles = `<style id="grand-subpage-map-styles">
  .framer-tfszgi[data-framer-name="Location"] {
    width: 100% !important;
    height: 92vh !important;
    min-height: 720px !important;
    position: relative !important;
    aspect-ratio: unset !important;
    overflow: hidden !important;
    background: #FFF0CA !important;
  }
  @media (max-width: 809.98px) {
    .framer-tfszgi[data-framer-name="Location"] {
      height: 75vh !important;
      min-height: 540px !important;
    }
  }
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
    /* Soft vertical blend into section header and footer */
    mask-image: linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%);
  }
</style>`;

html = html.replace(/<style id="grand-subpage-map-styles">[\s\S]*?<\/style>/, mapStyles);

// 2. Ensure the img tag has a cache-busting timestamp or latest srcset
const mapContent = `<div id="subpage-vector-map">
  <img src="/images/the_grand_lucknow_master_map_1920.png?v=zoom147"
       srcset="/images/the_grand_lucknow_master_map_1920.png?v=zoom147 1920w, /images/the_grand_lucknow_master_map.png?v=zoom147 3840w"
       sizes="100vw"
       alt="Cartographic map showing The Grand Lucknow location"
       loading="eager"
       decoding="async" />
</div>`;

html = html.replace(/<div id="subpage-vector-map">[\s\S]*?<\/div>/, mapContent);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully updated open-earth-lawn.html with big map styling!');
