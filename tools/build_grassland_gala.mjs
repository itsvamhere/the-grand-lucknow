import fs from 'fs';

const lawnHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

let galaHtml = lawnHtml;

// 1. Update Title and Meta
galaHtml = galaHtml.replace(
  /<title>.*?<\/title>/i,
  '<title>Grassland Gala • The Grand Lucknow</title>'
);

galaHtml = galaHtml.replace(
  /<meta name="description" content="[^"]*"/i,
  '<meta name="description" content="Grassland Gala at The Grand Lucknow – 14,000 sq ft luxury open-air celebration lawn accommodating up to 900 guests in Gomti Nagar, Lucknow."'
);

galaHtml = galaHtml.replace(
  /<meta property="og:title" content="[^"]*"/i,
  '<meta property="og:title" content="Grassland Gala • The Grand Lucknow"'
);

galaHtml = galaHtml.replace(
  /<meta property="og:description" content="[^"]*"/i,
  '<meta property="og:description" content="14,000 sq ft luxury open-air celebration lawn accommodating up to 900 guests in Gomti Nagar, Lucknow."'
);

// 2. Replace H1 contents
const galaH1Inner = `<span style="display:inline-flex;overflow:hidden;padding-top:0;margin-top:0;padding-left:0.06em;padding-right:0.06em;margin-left:-0.06em;margin-right:-0.06em;padding-bottom:4px;margin-bottom:-4px"><span class="grand-hero-word" style="display:inline-block;transform-origin:50% 100%;will-change:transform,opacity;">Grassland</span></span> <!-- --> <span style="display:inline-flex;overflow:hidden;padding-top:0;margin-top:0;padding-left:0.06em;padding-right:0.06em;margin-left:-0.06em;margin-right:-0.06em;padding-bottom:4px;margin-bottom:-4px"><span class="grand-hero-word" style="display:inline-block;transform-origin:50% 100%;will-change:transform,opacity;">Gala</span></span> <span style="position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap"> – Premier Luxury Celebration Lawn in Lucknow</span>`;

galaHtml = galaHtml.replace(
  /(<h1[^>]*>)[\s\S]*?(<\/h1>)/g,
  `$1${galaH1Inner}$2`
);

// 3. Update venue numbers
galaHtml = galaHtml.replace(/>N°1</g, '>N°2<');
galaHtml = galaHtml.replace(/>N°01</g, '>N°02<');
galaHtml = galaHtml.replace(/>Venue N°1</g, '>Venue N°2<');

// 4. Update Scale & Capacity
galaHtml = galaHtml.replace(/(?:25,000|55,000)\s*sq\s*ft/gi, '14,000 sq ft');
galaHtml = galaHtml.replace(/(?:2,500|1,500)\s*(?:People|guests|Capacity)/gi, '900 guests');
galaHtml = galaHtml.replace(/>(?:2,500|1,500)</g, '>900<');
galaHtml = galaHtml.replace(/>(?:25,000|55,000)</g, '>14,000<');

// 5. Update Description paragraph
const galaDescription = `A pristine 14,000 sq ft manicured lawn framed by architectural elegance and tropical palms. Designed for magnificent cocktail evenings, intimate wedding ceremonies, and vibrant sangeet celebrations for up to 900 guests under the Lucknow starlight.`;

galaHtml = galaHtml.replace(
  /(<div data-framer-name="Description"[\s\S]*?<p[^>]*>)([\s\S]*?)(<\/p>)/i,
  `$1${galaDescription}$3`
);

// 6. Update Gallery Photos (6 curated authentic venue photos)
const galaPhotos = [
  '/images/card_2_grassland_gala.webp',
  '/images/thumb_4.webp',
  '/images/thumb_1.webp',
  '/images/card_6_mandap_lawn.webp',
  '/images/thumb_6.webp',
  '/images/card_8_courtyard_day.webp'
];

// Update Hero background
galaHtml = galaHtml.replace(
  /src="[^"]*?(?:open_earth_lawn_1\.webp|the_grand_open_earth_lawn_hero\.jpg)"/g,
  `src="${galaPhotos[0]}"`
);
galaHtml = galaHtml.replace(
  /srcset="[^"]*?(?:open_earth_lawn_1\.webp|the_grand_open_earth_lawn_hero\.jpg)[^"]*"/g,
  `srcset="${galaPhotos[0]} 1920w"`
);

// Update 6 gallery items sequentially
let photoIdx = 0;
galaHtml = galaHtml.replace(
  /src="[^"]*?open_earth_lawn_\d\.webp"/g,
  () => {
    const p = galaPhotos[photoIdx % galaPhotos.length];
    photoIdx++;
    return `src="${p}"`;
  }
);

photoIdx = 0;
galaHtml = galaHtml.replace(
  /srcset="[^"]*?open_earth_lawn_\d\.webp[^"]*"/g,
  () => {
    const p = galaPhotos[photoIdx % galaPhotos.length];
    photoIdx++;
    return `srcset="${p} 1920w"`;
  }
);

// Write to venues/grassland-gala.html and venues/venue-n2.html
fs.writeFileSync('venues/grassland-gala.html', galaHtml, 'utf8');
fs.writeFileSync('venues/venue-n2.html', galaHtml, 'utf8');

console.log('Successfully updated venues/grassland-gala.html and venues/venue-n2.html!');
