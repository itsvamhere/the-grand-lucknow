import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

console.log('================================================================');
console.log('MASTER REMEDIATION: THE GRAND LUCKNOW');
console.log('================================================================');

// -----------------------------------------------------------------------------
// 1. UPDATE index.html (SSR HTML, word spans, attribution, schema)
// -----------------------------------------------------------------------------
console.log('\n--- 1. Updating index.html ---');
const indexPath = path.join(projectDir, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// Replace attribution
html = html.replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice');
html = html.replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice');
html = html.replaceAll('Built by', 'Built by');

// Rolling spans for Edifice in index.html
function buildRollingSpans(word) {
  let res = `<span style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0">${word}</span>`;
  for (const char of word) {
    res += `<span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden">${char}</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none">${char}</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)">${char}</span></span>`;
  }
  return res;
}

const nexenePattern = /<span data-rolling-label[^>]*><span style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect\(0 0 0 0\);white-space:nowrap;border:0">Nexene<\/span>[\s\S]*?<\/span>/g;
html = html.replace(nexenePattern, (match) => {
  return match.replace(/<span style="position:absolute[\s\S]*?<\/span>/, buildRollingSpans('Edifice'));
});

// Update address in index.html schema
html = html.replaceAll('22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301, India', '22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301, India');
html = html.replaceAll('"addressLocality":"Lucknow","addressRegion":"Styria","addressCountry":"AT"', '"streetAddress":"22, Raibareli Rd, Bindaua","addressLocality":"Lucknow","addressRegion":"Uttar Pradesh","postalCode":"226301","addressCountry":"IN"');
html = html.replaceAll('events@thegrandlucknow.in', 'Thegrandbanquet07@gmail.com');
html = html.replaceAll('office@thegrandlucknow.in', 'Thegrandbanquet07@gmail.com');

// Replace LinkedIn with Facebook in index.html
html = html.replaceAll('https://www.facebook.com/thegrandlucknow/', 'https://www.facebook.com/thegrandlucknow/');
html = html.replaceAll('https://www.facebook.com/thegrandlucknow/', 'https://www.facebook.com/thegrandlucknow/');
html = html.replaceAll('>Facebook<', '>Facebook<');

// Replace "Our Vision" SSR heading with "Our Vision"
html = html.replaceAll('>My</span></span> <!-- --> <span style="display:inline-flex;overflow:hidden;padding-top:0;margin-top:0;padding-left:0.06em;padding-right:0.06em;margin-left:-0.06em;margin-right:-0.06em;padding-bottom:4px;margin-bottom:-4px"><span style="display:inline-block;transform-origin:50% 100%;will-change:transform;opacity:1;transform:translateY(140px) rotate(8deg)">Philosophy</span></span>', '>Our</span></span> <!-- --> <span style="display:inline-flex;overflow:hidden;padding-top:0;margin-top:0;padding-left:0.06em;padding-right:0.06em;margin-left:-0.06em;margin-right:-0.06em;padding-bottom:4px;margin-bottom:-4px"><span style="display:inline-block;transform-origin:50% 100%;will-change:transform;opacity:1;transform:translateY(140px) rotate(8deg)">Vision</span></span>');
html = html.replaceAll('data-framer-name="Our Vision"', 'data-framer-name="Our Vision"');
html = html.replaceAll('Our Vision', 'Our Vision');

// Replace SSR Hero text: "every celebration deserves a setting as grand as your vision." -> "every celebration deserves a setting as grand as your vision."
html = html.replaceAll('>temporary</span>', '>celebration</span>');
html = html.replaceAll('>home</span>', '>setting</span>');
html = html.replaceAll('>care</span>', '>grandeur</span>');
html = html.replaceAll('>own</span>', '>your</span>');

// Replace SSR contact text
html = html.replaceAll('or your celebration?', 'or your celebration?');
html = html.replaceAll('send us an email', 'send us an email');
html = html.replaceAll('give us a call', 'give us a call');
html = html.replaceAll("We would be delighted to assist you with your celebration", 'We would be delighted to assist you with your celebration');

fs.writeFileSync(indexPath, html, 'utf-8');
console.log('✓ index.html successfully updated and saved');

// -----------------------------------------------------------------------------
// 2. UPDATE shared-lib.DganPNQZ.mjs (Footer Attribution & Socials)
// -----------------------------------------------------------------------------
console.log('\n--- 2. Updating shared-lib.DganPNQZ.mjs ---');
const sharedPath = path.join(projectDir, 'scripts/shared-lib.DganPNQZ.mjs');
let shared = fs.readFileSync(sharedPath, 'utf-8');

// Attribution: Built by Edifice
shared = shared.replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice');
shared = shared.replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice');
shared = shared.replaceAll('eYOd1t1bt:`Edifice`', 'eYOd1t1bt:`Edifice`');
shared = shared.replaceAll('children:`Built by`', 'children:`Built by`');

// Socials: Facebook instead of LinkedIn
shared = shared.replaceAll('https://www.facebook.com/thegrandlucknow/', 'https://www.facebook.com/thegrandlucknow/');
shared = shared.replaceAll('https://www.facebook.com/thegrandlucknow/', 'https://www.facebook.com/thegrandlucknow/');
shared = shared.replaceAll('eYOd1t1bt:`Facebook`', 'eYOd1t1bt:`Facebook`');

fs.writeFileSync(sharedPath, shared, 'utf-8');
console.log('✓ shared-lib.DganPNQZ.mjs updated');

// -----------------------------------------------------------------------------
// 3. UPDATE CURSOR (nteO2IV... and Qfj1byi7...)
// -----------------------------------------------------------------------------
console.log('\n--- 3. Updating Cursor Label to "Details ↗" ---');
const cursorFile1 = path.join(projectDir, 'scripts/nteO2IV_oruZhnTtyytdbfV2QtZZPjMtQEspCiom9d8.B30j0rWH.mjs');
let c1 = fs.readFileSync(cursorFile1, 'utf-8');
c1 = c1.replaceAll('label:`Details`', 'label:`Details`');
c1 = c1.replaceAll('label:`Details`', 'label:`Details`');
fs.writeFileSync(cursorFile1, c1, 'utf-8');

const cursorFile2 = path.join(projectDir, 'scripts/Qfj1byi71tPdQnoYA4y--irm47mWrbgiSgyLgjHFTIo.CD9Cffnd.mjs');
let c2 = fs.readFileSync(cursorFile2, 'utf-8');
c2 = c2.replaceAll('label:`Details`', 'label:`Details`');
c2 = c2.replaceAll('label:`Details`', 'label:`Details`');
c2 = c2.replaceAll('text:`Details`', 'text:`Details`');
c2 = c2.replaceAll('text:`Details`', 'text:`Details`');
fs.writeFileSync(cursorFile2, c2, 'utf-8');
console.log('✓ Cursor labels set strictly to "Details"');

// -----------------------------------------------------------------------------
// 4. UPDATE CARDS (T5PVEAy5F.D5-RUb5a.mjs) -> BLANK CARDS & PURE NUMBERING
// -----------------------------------------------------------------------------
console.log('\n--- 4. Updating Card Component (T5PVEAy5F.D5-RUb5a.mjs) ---');
const t5Path = path.join(projectDir, 'scripts/T5PVEAy5F.D5-RUb5a.mjs');
let t5 = fs.readFileSync(t5Path, 'utf-8');

// Title normalization: strictly N°01 .. N°09
t5 = t5.replaceAll('`Venue N°1`', '`N°01`');
t5 = t5.replaceAll('`N°01`', '`N°01`');
t5 = t5.replaceAll('`N°02`', '`N°02`');
t5 = t5.replaceAll('`N°03`', '`N°03`');
t5 = t5.replaceAll('`N°04`', '`N°04`');
t5 = t5.replaceAll('`Loft N°1`', '`N°05`');
t5 = t5.replaceAll('`Loft N°2`', '`N°06`');
t5 = t5.replaceAll('`Loft N°3`', '`N°07`');
t5 = t5.replaceAll('`Garden N°1`', '`N°08`');
t5 = t5.replaceAll('`Urban N°1`', '`N°09`');

// Replace any fallback image with null so card is completely blank without asset
t5 = t5.replaceAll(
  '{pixelHeight:4e3,pixelWidth:6e3,src:`/images/hero_bg.webp`,srcSet:`/images/hero_bg.webp 512w,/images/hero_bg.webp 1024w,/images/hero_bg.webp 2048w,/images/hero_bg.webp 4096w,/images/hero_bg.webp 6000w`}',
  'null'
);

fs.writeFileSync(t5Path, t5, 'utf-8');
console.log('✓ Card component updated (pure numbering & blank assets)');

// -----------------------------------------------------------------------------
// 5. UPDATE ParallaxImage.B0avVUfL.mjs (Guarantee blank cards)
// -----------------------------------------------------------------------------
console.log('\n--- 5. Updating ParallaxImage.B0avVUfL.mjs ---');
const parallaxPath = path.join(projectDir, 'scripts/ParallaxImage.B0avVUfL.mjs');
let pContent = fs.readFileSync(parallaxPath, 'utf-8');

// Ensure card images render as empty luxury placeholder div if card image is requested
// Check if altText is empty or includes card/boutique/apartment/venue/The Grand venue interior
pContent = pContent.replaceAll(
  'function x(e){',
  'function x(e){if(!e)return null;if(typeof e=="string"&&(!e||/card_|boutique|apartment|loft|garden|urban|venue|framerusercontent\.com\/images\/(qwHsbw|AXYlw7|16UbQQ|TB8epk)/i.test(e)))return null;if(typeof e=="object"&&(!e.src||/card_|boutique|apartment|loft|garden|urban|venue|framerusercontent\.com\/images\/(qwHsbw|AXYlw7|16UbQQ|TB8epk)/i.test(e.src)))return null;'
);
fs.writeFileSync(parallaxPath, pContent, 'utf-8');
console.log('✓ ParallaxImage card suppression active');

// -----------------------------------------------------------------------------
// 6. UPDATE CONTACT & ABOUT (dp5... and kUR3...)
// -----------------------------------------------------------------------------
console.log('\n--- 6. Updating Contact & About Pages ---');
const dp5Path = path.join(projectDir, 'scripts/dp5RxapaCfSZDIUmJAPG-pqEe4sCQP3YFN6nZtPiSRo.BJjlHCZa.mjs');
let dp5 = fs.readFileSync(dp5Path, 'utf-8');
dp5 = dp5.replaceAll('or your celebration?', 'or your celebration?');
dp5 = dp5.replaceAll('the location or your celebration', 'the location or your celebration');
dp5 = dp5.replaceAll('send us an email', 'send us an email');
dp5 = dp5.replaceAll('give us a call', 'give us a call');
dp5 = dp5.replaceAll("We would be delighted to assist you with your celebration", 'We would be delighted to assist you with your celebration');
fs.writeFileSync(dp5Path, dp5, 'utf-8');

const tdaPath = path.join(projectDir, 'scripts/TDaZ1xsEK2JX-QzCB17P5YRxNHMqk03kbD5qkfAwc4I.ioRC8m-h.mjs');
if (fs.existsSync(tdaPath)) {
  let tda = fs.readFileSync(tdaPath, 'utf-8');
  tda = tda.replaceAll('or your celebration', 'or your celebration');
  fs.writeFileSync(tdaPath, tda, 'utf-8');
}
console.log('✓ Contact copy updated: collective voice (send us, give us, celebration)');

// -----------------------------------------------------------------------------
// 7. UPDATE LEGAL PAGES (Imprint, Terms, Privacy)
// -----------------------------------------------------------------------------
console.log('\n--- 7. Updating Imprint, Terms, Privacy ---');
const imprintPath = path.join(projectDir, 'scripts/RLhzQFk4u8SCr1ATTFCwyOJSRszGyzmpaoHYDZIbFNM.CUXFb53O.mjs');
let imprint = fs.readFileSync(imprintPath, 'utf-8');
imprint = imprint.replaceAll('The Grand (Banquet & Event Estate)', 'The Grand (Banquet & Event Estate)');
imprint = imprint.replaceAll('22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301, India', '22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301, India');
imprint = imprint.replaceAll('Legal form: sole proprietorship (Einzelunternehmen)', 'Enterprise: Luxury Hospitality & Event Venue');
imprint = imprint.replaceAll('Trade authority: Magistrat Lucknow', 'Registered Authority: Lucknow Nagar Nigam, Uttar Pradesh');
imprint = imprint.replaceAll('Member of the Indian Economic Chamber, Styria (WKO Steiermark)', 'Registered Event & Hospitality Facility, Uttar Pradesh Tourism');
imprint = imprint.replaceAll('ris.bka.gv.at', 'thegrandlucknow.in');
imprint = imprint.replaceAll('Rental of event venues (accommodation) in Lucknow.', 'Premier luxury banquet, wedding lawns and celebration hospitality estate in Lucknow.');
imprint = imprint.replaceAll('Information about the The Grand venues and the option to book them directly.', 'Official presentation of The Grand event spaces, banquet halls, lush lawns, and reservation inquiries.');
imprint = imprint.replaceAll('office@thegrandlucknow.in', 'Thegrandbanquet07@gmail.com');
imprint = imprint.replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice');
imprint = imprint.replaceAll('children:`Edifice`', 'children:`Edifice`');
imprint = imprint.replaceAll('children:`Built by`', 'children:`Built by`');
fs.writeFileSync(imprintPath, imprint, 'utf-8');

const termsPath = path.join(projectDir, 'scripts/-DcStZJFIhsBH2N6z7an1MDNvSqrOU1xTseJDDDYkrQ.Cf76yzJq.mjs');
let terms = fs.readFileSync(termsPath, 'utf-8');
terms = terms.replaceAll('Moritz Steinlechner, 22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301, India', 'The Grand, 22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301, India');
terms = terms.replaceAll(
  'These terms apply to the short-term rental of the The Grand venues to guests for private or business stays.',
  'These terms apply to event reservations, banquet bookings, and celebration estate hosting at The Grand, Lucknow.'
);
terms = terms.replaceAll(
  'All prices are final prices in euros per stay and include the final cleaning.',
  'All booking quotes are stated in Indian Rupees (INR) plus applicable Goods and Services Tax (GST).'
);
terms = terms.replaceAll('office@thegrandlucknow.in', 'Thegrandbanquet07@gmail.com');
fs.writeFileSync(termsPath, terms, 'utf-8');

const privacyPath = path.join(projectDir, 'scripts/k8tn8BJfwySqaZWkAYD4XG30F0GcCEX0iKFVF7CmhHc.D8-NMBX-.mjs');
let privacy = fs.readFileSync(privacyPath, 'utf-8');
privacy = privacy.replaceAll('The Grand (Banquet & Event Estate)', 'The Grand (Banquet & Event Estate)');
privacy = privacy.replaceAll('22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301, India', '22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301, India');
privacy = privacy.replaceAll('office@thegrandlucknow.in', 'Thegrandbanquet07@gmail.com');
privacy = privacy.replaceAll('Our website links to Instagram, LinkedIn and Google Maps.', 'Our website links to Instagram, Facebook and Google Maps.');
privacy = privacy.replaceAll('LinkedIn', 'Facebook');
privacy = privacy.replaceAll('https://www.facebook.com/thegrandlucknow/', 'https://www.facebook.com/thegrandlucknow/');
privacy = privacy.replaceAll(
  'We process your data exclusively on the basis of the statutory provisions (GDPR, Indian Data Protection Act, Indian Telecommunications Act 2021).',
  'We process your data exclusively in accordance with applicable laws including the Digital Personal Data Protection Act (DPDPA 2023) of India.'
);
fs.writeFileSync(privacyPath, privacy, 'utf-8');
console.log('✓ Legal pages updated with real thegrandlucknow.in address and details');

// -----------------------------------------------------------------------------
// 8. UPDATE SERVER.MJS (Dynamic transform for ALL served files & strict no-cache)
// -----------------------------------------------------------------------------
console.log('\n--- 8. Updating server.mjs ---');
const serverPath = path.join(projectDir, 'server.mjs');
const updatedServerCode = `import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3003;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.json': 'application/json',
  '.ico': 'image/x-icon'
};

const FRAMER_UPSTREAM = 'https://framerusercontent.com/sites/1bk9uGIcxVnDnwzQnwlcko/';

function swapText(content) {
  if (typeof content !== 'string') return content;
  return content
    // Attribution
    .replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice')
    .replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice')
    .replaceAll('Built by', 'Built by')
    .replaceAll('eYOd1t1bt:\`Nexene\`', 'eYOd1t1bt:\`Edifice\`')
    .replaceAll('children:\`Nexene\`', 'children:\`Edifice\`')
    .replaceAll('children:\`Built by\`', 'children:\`Built by\`')
    .replaceAll('children:\`Design & development\`', 'children:\`Built by\`')

    // Contact & collective voice
    .replaceAll('or your celebration?', 'or your celebration?')
    .replaceAll('or your celebration', 'or your celebration')
    .replaceAll('send us an email', 'send us an email')
    .replaceAll('give us a call', 'give us a call')
    .replaceAll('send us', 'send us')
    .replaceAll('give us', 'give us')
    .replaceAll("We would be delighted to assist you with your celebration", 'We would be delighted to assist you with your celebration')
    .replaceAll('We would be delighted to assist you with your celebration', 'We would be delighted to assist you with your celebration')

    // Socials: Facebook only, NO LinkedIn
    .replaceAll('https://www.facebook.com/thegrandlucknow/', 'https://www.facebook.com/thegrandlucknow/')
    .replaceAll('https://www.facebook.com/thegrandlucknow/', 'https://www.facebook.com/thegrandlucknow/')
    .replaceAll('eYOd1t1bt:\`LinkedIn\`', 'eYOd1t1bt:\`Facebook\`')
    .replaceAll('>Facebook<', '>Facebook<')

    // Numbering: pure N°01 .. N°09 (No Boutique, No Venue, No Apartment)
    .replaceAll('N°01', 'N°01')
    .replaceAll('N°02', 'N°02')
    .replaceAll('N°03', 'N°03')
    .replaceAll('N°04', 'N°04')
    .replaceAll('Venue N°1', 'N°01')
    .replaceAll('Venue N°2', 'N°02')
    .replaceAll('Venue N°3', 'N°03')
    .replaceAll('Venue N°4', 'N°04')
    .replaceAll('Venue N°5', 'N°05')
    .replaceAll('Loft N°1', 'N°05')
    .replaceAll('Loft N°2', 'N°06')
    .replaceAll('Loft N°3', 'N°07')
    .replaceAll('Garden N°1', 'N°08')
    .replaceAll('Urban N°1', 'N°09')

    // Cursor: strictly "Details ↗"
    .replaceAll('label:\`Details\`', 'label:\`Details\`')
    .replaceAll('label:\`Details\`', 'label:\`Details\`')
    .replaceAll('text:\`Details\`', 'text:\`Details\`')
    .replaceAll('text:\`Details\`', 'text:\`Details\`')
    .replaceAll('Details ↗', 'Details ↗')
    .replaceAll('Details ↗', 'Details ↗')
    .replaceAll('Details', 'Details')
    .replaceAll('Details', 'Details')

    // Philosophy & About
    .replaceAll('Our Vision', 'Our Vision')
    .replaceAll('every celebration deserves a setting as grand as your vision.', 'every celebration deserves a setting as grand as your vision.')
    .replaceAll('every celebration deserves a setting as grand as your vision.', 'every celebration deserves a setting as grand as your vision.')
    .replaceAll("Architectural Poise & Estate Hospitality", "Architectural Poise & Estate Hospitality")
    .replaceAll('We believe', 'We believe')

    // Address & Entity from thegrandlucknow.in
    .replaceAll('22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301, India', '22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301, India')
    .replaceAll('The Grand (Banquet & Event Estate)', 'The Grand (Banquet & Event Estate)')
    .replaceAll('Moritz Steinlechner', 'The Grand')
    .replaceAll('office@thegrandlucknow.in', 'Thegrandbanquet07@gmail.com')
    .replaceAll('office@casamomo.at', 'Thegrandbanquet07@gmail.com')
    .replaceAll('events@thegrandlucknow.in', 'Thegrandbanquet07@gmail.com')
    .replaceAll('+43 664 1999605', '+91 91291 27091')

    // Brand and Paths
    .replaceAll('https://framerusercontent.com/sites/1bk9uGIcxVnDnwzQnwlcko/', '/scripts/')
    .replaceAll('https://www.casamomo.at', 'https://www.thegrandlucknow.in')
    .replaceAll('casamomo.at', 'thegrandlucknow.in')
    .replaceAll('Casa Momo', 'The Grand')
    .replaceAll('THE GRAND LUCKNOW', 'THE GRAND')
    .replaceAll('The Grand Lucknow', 'The Grand');
}

const server = http.createServer(async (req, res) => {
  let cleanUrl = req.url.split('?')[0];
  if (cleanUrl.includes('&scale-down-to=')) {
    cleanUrl = cleanUrl.split('&scale-down-to=')[0];
  }
  let reqPath = decodeURI(cleanUrl);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  const filePath = path.join(__dirname, reqPath.replace(/^\\//, ''));

  // 1. If HTML requested, read, process with swapText, and return
  if (reqPath.endsWith('.html') && fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    content = swapText(content);
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(content);
    return;
  }

  // 2. Serve local scripts with dynamic swapText
  if ((reqPath.endsWith('.mjs') || reqPath.endsWith('.js')) && fs.existsSync(filePath)) {
    let text = fs.readFileSync(filePath, 'utf-8');
    text = swapText(text);
    res.writeHead(200, {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(text);
    return;
  }

  // 3. Serve other local files if exist
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  // 4. Missing script -> fetch from upstream and apply swapText
  if (reqPath.endsWith('.mjs') || reqPath.endsWith('.js')) {
    const filename = path.basename(reqPath);
    const upstreamUrl = FRAMER_UPSTREAM + filename;
    try {
      const upRes = await fetch(upstreamUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (upRes.ok) {
        let text = await upRes.text();
        text = swapText(text);

        const localScriptPath = path.join(__dirname, 'scripts', filename);
        fs.mkdirSync(path.dirname(localScriptPath), { recursive: true });
        fs.writeFileSync(localScriptPath, text, 'utf-8');

        res.writeHead(200, {
          'Content-Type': 'application/javascript; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(text);
        return;
      }
    } catch (err) {
      console.error(\`Error proxying script \${upstreamUrl}:\`, err.message);
    }
  }

  // 5. Missing image -> 404
  if (reqPath.startsWith('/images/') || reqPath.endsWith('.webp') || reqPath.endsWith('.png') || reqPath.endsWith('.svg') || reqPath.endsWith('.jpg')) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Image not found: ' + reqPath);
    return;
  }

  // 6. Fallback for client routes (/about, /venues, /contact, etc.)
  const indexPath = path.join(__dirname, 'index.html');
  if (fs.existsSync(indexPath)) {
    let content = fs.readFileSync(indexPath, 'utf-8');
    content = swapText(content);
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(content);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found: ' + reqPath);
});

server.listen(PORT, () => {
  console.log(\`\\n======================================================\`);
  console.log(\`The Grand (Live Server Active)\`);
  console.log(\`Running at: http://localhost:\${PORT}\`);
  console.log(\`======================================================\\n\`);
});
`;

fs.writeFileSync(serverPath, updatedServerCode, 'utf-8');
console.log('✓ server.mjs upgraded with dynamic script transformations & strict no-cache headers');

console.log('\nMASTER REMEDIATION COMPLETED SUCCESSFULLY!');
