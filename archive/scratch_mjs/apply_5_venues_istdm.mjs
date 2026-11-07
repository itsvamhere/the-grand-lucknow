import fs from 'fs';

let content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs', 'utf8');

// The exact 5 real venues from The Grand Lucknow:
// 1. Open Earth Lawn: 55,000 Sqft, 1,500 Guests
// 2. Grassland Gala: 20,000 Sqft, 800 Guests
// 3. The Royal Legacy Banquet: 10,000 Sqft, 600 Guests (Indoor Chandelier Ballroom)
// 4. Garden Galaxy: 15,000 Sqft, 300 Guests
// 5. The Grand Courtyard: 15,000 Sqft, 250 Guests

const replacementCode = `(()=>{
  const grandVenues = [
    { num: 'N°01', name: 'Open Earth Lawn', area: '55,000', cap: '1,500', slug: 'venue-n1', img: '/images/card_1_open_earth.webp' },
    { num: 'N°02', name: 'Grassland Gala', area: '20,000', cap: '800', slug: 'venue-n2', img: '/images/card_2_grassland_gala.webp' },
    { num: 'N°03', name: 'The Royal Legacy Banquet', area: '10,000', cap: '600', slug: 'venue-n3', img: '/images/card_3_ballroom.webp' },
    { num: 'N°04', name: 'Garden Galaxy', area: '15,000', cap: '300', slug: 'venue-n4', img: '/images/card_4_courtyard.webp' },
    { num: 'N°05', name: 'The Grand Courtyard', area: '15,000', cap: '250', slug: 'venue-n5', img: '/images/card_5_garden_pavilion.webp' }
  ];
  const v = grandVenues[c % 5];
  s = v.slug;
  i = v.num;
  o = v.area;
  n = v.cap;
  e = v.name;
  a = { pixelHeight: 1500, pixelWidth: 1500, src: v.img, srcSet: \`\${v.img} 512w,\${v.img} 1024w,\${v.img} 1500w\` };
})()`;

// Find the target string to replace
const targetStart = "(()=>{s=`space-0${c+1}`;i=`N°0${c+1}`;o=``;n=``;e=``;a=([{pixelHeight:1500";
const targetEnd = ")[c%9];})()";

const sIdx = content.indexOf(targetStart);
const eIdx = content.indexOf(targetEnd, sIdx);

if (sIdx !== -1 && eIdx !== -1) {
  const fullTarget = content.substring(sIdx, eIdx + targetEnd.length);
  content = content.replace(fullTarget, replacementCode);
  console.log('Successfully replaced venue card generator with real 5 venues and area/guest numbers!');
} else {
  console.error('Target not found in IStDm');
}

fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs', content, 'utf8');
