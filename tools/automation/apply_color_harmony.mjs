import fs from 'node:fs';

let html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// 1. Update cache buster to ?v=osm_match_v4
html = html.replaceAll('osm_match_v3', 'osm_match_v4');

// 2. Add high-taste styling for Location section and Open in Maps button to match Casa Momo
const customStyle = `
  /* CASA MOMO AUTHENTIC LOCATION & MAP COLOR HARMONY */
  #bigtext-1 h2 {
    color: #746A54 !important;
  }
  #bigtext-1 h2 span {
    color: #746A54 !important;
  }
  #bigtext-1 a.framer-vO7O2,
  #bigtext-1 a.dark-btn,
  .framer-vO7O2[data-framer-name="Dark"].dark-btn,
  a.grand-nav-maps-btn.dark-btn {
    background-color: #706748 !important;
    color: #FFF0CA !important;
    fill: #FFF0CA !important;
  }
  #bigtext-1 a.framer-vO7O2 *,
  #bigtext-1 a.dark-btn * {
    color: #FFF0CA !important;
    fill: #FFF0CA !important;
  }
`;

// Insert the custom style in the <head>
if (!html.includes('CASA MOMO AUTHENTIC LOCATION & MAP COLOR HARMONY')) {
  html = html.replace('</head>', `<style id="casa-momo-location-color-harmony">${customStyle}</style>\n</head>`);
} else {
  html = html.replace(/<style id="casa-momo-location-color-harmony">[\s\S]*?<\/style>/, `<style id="casa-momo-location-color-harmony">${customStyle}</style>`);
}

fs.writeFileSync('venues/open-earth-lawn.html', html);
console.log('Successfully updated venues/open-earth-lawn.html with authentic Casa Momo color harmony and ?v=osm_match_v4!');
