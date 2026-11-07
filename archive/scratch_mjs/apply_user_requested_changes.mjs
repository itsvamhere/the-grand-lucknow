import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

console.log('=== 1. Updating Socials (Remove LinkedIn, Add Facebook & Instagram) ===');
const sharedPath = path.join(projectDir, 'scripts/shared-lib.DganPNQZ.mjs');
let shared = fs.readFileSync(sharedPath, 'utf-8');

shared = shared.replaceAll('https://www.facebook.com/thegrandlucknow/', 'https://www.facebook.com/thegrandlucknow/');
shared = shared.replaceAll('https://www.instagram.com/thegrandlucknow.in/', 'https://www.instagram.com/thegrand.lucknow/');
shared = shared.replaceAll('eYOd1t1bt:`Facebook`', 'eYOd1t1bt:`Facebook`');
shared = shared.replaceAll('znBqpYqYV:`var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2)`', 'znBqpYqYV:`var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2)`');

fs.writeFileSync(sharedPath, shared, 'utf-8');
console.log('✓ Updated shared-lib.DganPNQZ.mjs');

console.log('=== 2. Updating Contact Page ("send us and not me" & real phone link) ===');
const dp5Path = path.join(projectDir, 'scripts/dp5RxapaCfSZDIUmJAPG-pqEe4sCQP3YFN6nZtPiSRo.BJjlHCZa.mjs');
let dp5 = fs.readFileSync(dp5Path, 'utf-8');

dp5 = dp5.replace(
  /Feel free to send us an email or give us a call at \+91 91291 27091\. We would be delighted to assist you with your celebration ☺/g,
  'Feel free to send us an email or give us a call at +91 91291 27091. We would be delighted to assist you with your celebration.'
);
dp5 = dp5.replace(/tel:\+436641999605/g, 'tel:+919129127091');
dp5 = dp5.replace(/label:`Details`/g, 'label:`Details`');
dp5 = dp5.replace(/label:`Details`/g, 'label:`Details`');
// Set map image in contact page
dp5 = dp5.replace(/\/images\/craft_feature_1\.webp/g, '/images/map_cutout.webp');

fs.writeFileSync(dp5Path, dp5, 'utf-8');
console.log('✓ Updated dp5 (Contact page)');

console.log('=== 3. Updating Cursor in ScrollRadius.DdPK9K17.mjs ===');
const scrollRadPath = path.join(projectDir, 'scripts/ScrollRadius.DdPK9K17.mjs');
let scrollRad = fs.readFileSync(scrollRadPath, 'utf-8');
scrollRad = scrollRad.replaceAll('label:v=`Details`', 'label:v=`Details`');
scrollRad = scrollRad.replaceAll('defaultValue:`Details`', 'defaultValue:`Details`');
scrollRad = scrollRad.replaceAll('"data-cursor":`Details`', '"data-cursor":`Details`');
scrollRad = scrollRad.replaceAll('"data-cursor":`Details`', '"data-cursor":`Details`');
fs.writeFileSync(scrollRadPath, scrollRad, 'utf-8');
console.log('✓ Updated ScrollRadius.DdPK9K17.mjs');

console.log('=== 4. Updating ParallaxImage.B0avVUfL.mjs to suppress Casa Momo images & render blank containers ===');
const pImgPath = path.join(projectDir, 'scripts/ParallaxImage.B0avVUfL.mjs');
let pImg = fs.readFileSync(pImgPath, 'utf-8');

// Modify image loader x(e) so Casa Momo apartment photos or empty sources return null
pImg = pImg.replace(
  'function x(e){',
  'function x(e){if(!e)return null;if(typeof e=="string"&&(e==""||/qwHsbw|AXYlw7|16UbQQ|TB8epk|card_|boutique|apartment/i.test(e)))return null;if(typeof e=="object"&&(!e.src||/qwHsbw|AXYlw7|16UbQQ|TB8epk|card_|boutique|apartment/i.test(e.src)))return null;'
);
fs.writeFileSync(pImgPath, pImg, 'utf-8');
console.log('✓ Updated ParallaxImage.B0avVUfL.mjs');

console.log('=== 5. Updating Venues Page (fr7SG9GQkh-Q7q0KIf8wgobOAuPxVSUAvz16mel55Cw.DZ6IOu8F.mjs) ===');
const fr7Path = path.join(projectDir, 'scripts/fr7SG9GQkh-Q7q0KIf8wgobOAuPxVSUAvz16mel55Cw.DZ6IOu8F.mjs');
let fr7 = fs.readFileSync(fr7Path, 'utf-8');

// Update cursor label
fr7 = fr7.replaceAll('label:`Details`', 'label:`Details`');
fr7 = fr7.replaceAll('label:`Details`', 'label:`Details`');

// In fr7, override the card rendering loop to be completely blank of Casa Momo assets and numbered N°01, N°02...
const targetFr7Map = 'children:e?.map(({Bn2PI_q7i:e,id:t,MW1ol9EEJ:n,NMJR8UsRD:r,PFZZ97FrQ:i,rurNgoD6s:a,RwQ9LnKAg:o,Xm83njC6M:s},ee)=>(s??=``,i??=``,o??=``,n??=``,e??=``,';
if (fr7.includes(targetFr7Map)) {
  const replacementFr7Map = 'children:e?.map(({Bn2PI_q7i:e,id:t,MW1ol9EEJ:n,NMJR8UsRD:r,PFZZ97FrQ:i,rurNgoD6s:a,RwQ9LnKAg:o,Xm83njC6M:s},ee)=>(s=`space-0${ee+1}`,i=`N°0${ee+1}`,o=``,n=``,e=``,a=null,';
  fr7 = fr7.replace(targetFr7Map, replacementFr7Map);
  console.log('✓ fr7 card mapper overridden with blank asset & clean N°01..N°09 numbering!');
} else {
  console.warn('! targetFr7Map not found directly, checking regex...');
  fr7 = fr7.replace(
    /children:e\?\.map\(\(\{Bn2PI_q7i:e,id:t,MW1ol9EEJ:n,NMJR8UsRD:r,PFZZ97FrQ:i,rurNgoD6s:a,RwQ9LnKAg:o,Xm83njC6M:s\},ee\)=>\(/g,
    'children:e?.map(({Bn2PI_q7i:e,id:t,MW1ol9EEJ:n,NMJR8UsRD:r,PFZZ97FrQ:i,rurNgoD6s:a,RwQ9LnKAg:o,Xm83njC6M:s},ee)=>(s=`space-0${ee+1}`,i=`N°0${ee+1}`,o=``,n=``,e=``,a=null,'
  );
}
fs.writeFileSync(fr7Path, fr7, 'utf-8');
console.log('✓ fr7 updated');

console.log('=== 6. Updating Home Page (IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs) ===');
const istPath = path.join(projectDir, 'scripts/IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs');
let ist = fs.readFileSync(istPath, 'utf-8');

// Update cursor label
ist = ist.replaceAll('label:`Details`', 'label:`Details`');
ist = ist.replaceAll('label:`Details`', 'label:`Details`');

// Map cutout in Locations section
ist = ist.replace('/images/host_portrait.webp', '/images/map_cutout.webp');
ist = ist.replace('/images/craft_feature_1.webp', '/images/map_cutout.webp');

// Card mapper override: blank assets, clean N°01..N°09
ist = ist.replace(
  /\(\(\)=>\{const D=[\s\S]*?const v=M\[i\]\|\|D\[c%D\.length\];o=v\.s;n=v\.c;\}\)\(\)/g,
  '(()=>{s=`space-0${c+1}`;i=`N°0${c+1}`;o=``;n=``;e=``;a=null;})()'
);

fs.writeFileSync(istPath, ist, 'utf-8');
console.log('✓ ist updated');

console.log('=== 7. Updating About Page (kUR3CfpW9NIyRzidNwuOKmKl470PoGVqflldEj15ME4.Sg5Y4YBO.mjs) ===');
const kurPath = path.join(projectDir, 'scripts/kUR3CfpW9NIyRzidNwuOKmKl470PoGVqflldEj15ME4.Sg5Y4YBO.mjs');
let kur = fs.readFileSync(kurPath, 'utf-8');
kur = kur.replace('/images/craft_feature_1.webp', '/images/map_cutout.webp');
kur = kur.replaceAll('label:`Details`', 'label:`Details`');
kur = kur.replaceAll('label:`Details`', 'label:`Details`');
fs.writeFileSync(kurPath, kur, 'utf-8');
console.log('✓ kur updated');

console.log('=== 8. Updating index.html & server.mjs ===');
let html = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf-8');

// Social links in index.html
html = html.replaceAll('https://www.facebook.com/thegrandlucknow/', 'https://www.facebook.com/thegrandlucknow/');
html = html.replaceAll('https://www.instagram.com/thegrandlucknow.in/', 'https://www.instagram.com/thegrand.lucknow/');

// Replace LinkedIn rolling letter spans with Facebook
const linkedinSpans = '<span style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0">Facebook</span>';
const facebookSpans = '<span style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0">Facebook</span>';

function buildRollingSpans(word) {
  let res = `<span style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0">${word}</span>`;
  for (const char of word) {
    res += `<span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden">${char}</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none">${char}</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)">${char}</span></span>`;
  }
  return res;
}

// Replace LinkedIn rolling spans block
const linkedinPattern = /<span data-rolling-label[^>]*><span style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect\(0 0 0 0\);white-space:nowrap;border:0">Facebook<\/span>[\s\S]*?<\/span>/g;
html = html.replace(linkedinPattern, (match) => {
  return match.replace(/<span style="position:absolute[\s\S]*?<\/span>/, buildRollingSpans('Facebook'));
});

// Update data-cursor
html = html.replaceAll('data-cursor="Details"', 'data-cursor="Details"');
html = html.replaceAll('data-cursor="Details"', 'data-cursor="Details"');

// Replace card images and titles in SSR HTML
html = html.replaceAll('N°01', 'N°01');
html = html.replaceAll('N°02', 'N°02');
html = html.replaceAll('N°03', 'N°03');
html = html.replaceAll('N°04', 'N°04');
html = html.replaceAll('Venue N°1', 'N°01');
html = html.replaceAll('Venue N°2', 'N°02');
html = html.replaceAll('Venue N°3', 'N°03');
html = html.replaceAll('Venue N°4', 'N°04');
html = html.replaceAll('Venue N°5', 'N°05');
html = html.replaceAll('Venue N°6', 'N°06');
html = html.replaceAll('Venue N°7', 'N°07');
html = html.replaceAll('Venue N°8', 'N°08');
html = html.replaceAll('Venue N°9', 'N°09');

// Map cutout in index.html
html = html.replace('/images/host_portrait.webp', '/images/map_cutout.webp');

fs.writeFileSync(path.join(projectDir, 'index.html'), html, 'utf-8');
console.log('✓ index.html updated');

// Update server.mjs
let server = fs.readFileSync(path.join(projectDir, 'server.mjs'), 'utf-8');
server = server.replaceAll('https://www.facebook.com/thegrandlucknow/', 'https://www.facebook.com/thegrandlucknow/');
server = server.replaceAll('https://www.instagram.com/thegrandlucknow.in/', 'https://www.instagram.com/thegrand.lucknow/');
server = server.replaceAll('Details', 'Details');
server = server.replaceAll('Details', 'Details');
server = server.replaceAll('N°01', 'N°01');
server = server.replaceAll('N°02', 'N°02');
server = server.replaceAll('N°03', 'N°03');
server = server.replaceAll('N°04', 'N°04');
server = server.replaceAll('Venue N°1', 'N°01');
server = server.replaceAll('Venue N°2', 'N°02');
server = server.replaceAll('Venue N°3', 'N°03');
server = server.replaceAll('Venue N°4', 'N°04');
server = server.replaceAll('Venue N°5', 'N°05');
server = server.replaceAll('Venue N°6', 'N°06');
server = server.replaceAll('Venue N°7', 'N°07');
server = server.replaceAll('Venue N°8', 'N°08');
server = server.replaceAll('Venue N°9', 'N°09');

// Add collective hospitality phrases
if (!server.includes('send us an email')) {
  server = server.replace(
    'function swapText(content) {',
    `function swapText(content) {
  content = content
    .replaceAll('send us an email', 'send us an email')
    .replaceAll('give us a call', 'give us a call')
    .replaceAll('send us', 'send us')
    .replaceAll('give us', 'give us')
    .replaceAll('I\\'d be happy to help you personally', 'We would be delighted to assist you with your celebration')
    .replaceAll('LinkedIn', 'Facebook')
    .replaceAll('https://www.facebook.com/thegrandlucknow/', 'https://www.facebook.com/thegrandlucknow/')
    .replaceAll('https://www.instagram.com/thegrandlucknow.in/', 'https://www.instagram.com/thegrand.lucknow/');`
  );
}

fs.writeFileSync(path.join(projectDir, 'server.mjs'), server, 'utf-8');
console.log('✓ server.mjs updated');

console.log('All user requested changes applied!');
