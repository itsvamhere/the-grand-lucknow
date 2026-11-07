import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

console.log('--- 1. Updating Reviews in fr7SG9GQkh-Q7q0KIf8wgobOAuPxVSUAvz16mel55Cw.DZ6IOu8F.mjs ---');
const fr7Path = path.join(projectDir, 'scripts/fr7SG9GQkh-Q7q0KIf8wgobOAuPxVSUAvz16mel55Cw.DZ6IOu8F.mjs');
if (fs.existsSync(fr7Path)) {
  let fr7 = fs.readFileSync(fr7Path, 'utf-8');

  // Replace reviews text
  fr7 = fr7.replace(
    /“Moritz is such a gentle and wonderful host![\s\S]*?definitely choose this place again!”/g,
    '“The Grand provided an awe-inspiring setting for our three-day wedding celebration. The grand banquet hall, pillarless architecture, and sprawling open lawns were meticulously decorated. The estate hospitality team anticipated every need with warmth and poise. Our guests are still raving about the experience!”'
  );

  fr7 = fr7.replace(
    /“A family of three adults and one infant stayed at Moritz's Lucknow venue[\s\S]*?recommended this Lucknow property to others.”/g,
    '“We hosted our National Leadership Summit and Gala at The Grand. The acoustics, seamless AV staging, and banquet dining for over 900 delegates exceeded our highest expectations. Gomti Nagar’s finest luxury event venue with unmatched service standards.”'
  );

  fr7 = fr7.replace(
    /“I had a truly wonderful experience staying at this flat[\s\S]*?welcoming experience!”/g,
    '“A truly regal destination in Lucknow. From the majestic entrance illuminated with chandeliers to the expansive lawns, every celebration milestone was handled flawlessly by The Grand’s on-site team. Spacious bridal suites, royal decor, and impeccable hospitality.”'
  );

  fr7 = fr7.replace(
    /“A beautifully renovated, spacious, and airy venue with phenomenal views[\s\S]*?stay in this venue again!”/g,
    '“A beautifully landscaped, spacious, and royal estate with phenomenal open lawns and pillarless banquets in Gomti Nagar. Ample parking for our 1,500 guests, exquisite dining setups, and attentive estate staff made our family jubilee unforgettable.”'
  );

  fr7 = fr7.replace(
    /“Moritz's venue is fantastic![\s\S]*?we'll be back!”/g,
    '“The Grand’s hospitality and architectural elegance are truly peerless. The versatile indoor and outdoor stages offered the perfect canvas for our evening showcase. The finest luxury venue experience in Lucknow!”'
  );

  // Replace authors
  fr7 = fr7.replace(/j0DM_httP:`Jiyeon`/g, 'j0DM_httP:`Ananya & Rohan Sharma`');
  fr7 = fr7.replace(/j0DM_httP:`Gary`/g, 'j0DM_httP:`Dr. Vikramaditya Singhania`');
  fr7 = fr7.replace(/j0DM_httP:`Abishek`/g, 'j0DM_httP:`Pooja & Karan Mehra`');
  fr7 = fr7.replace(/j0DM_httP:`Monika`/g, 'j0DM_httP:`Sunita & Rajesh Aggarwal`');
  fr7 = fr7.replace(/j0DM_httP:`Heike`/g, 'j0DM_httP:`Aditi Rao`');

  // Replace avatars
  fr7 = fr7.replace(/https:\/\/framerusercontent\.com\/images\/AXYlw7CIyykoBcVsZ7oZjhKyLo\.webp\?width=225&height=225/g, '/images/avatar_1.webp');
  fr7 = fr7.replace(/https:\/\/framerusercontent\.com\/images\/fXHMJMUtj5ZLIisCkeThADmEu4\.webp\?width=225&height=225/g, '/images/avatar_2.webp');
  fr7 = fr7.replace(/https:\/\/framerusercontent\.com\/images\/dGzaqmqe0buiA6KJq1NmnbiY4\.webp\?width=225&height=225/g, '/images/avatar_3.webp');
  fr7 = fr7.replace(/https:\/\/framerusercontent\.com\/images\/S6yAIpkbGOEgEHW0k7BxB4as9Q\.webp\?width=225&height=225/g, '/images/avatar_4.webp');
  fr7 = fr7.replace(/https:\/\/framerusercontent\.com\/images\/YtDDSnNTrnTsjZhdcUHaWTN84is\.webp\?width=225&height=225/g, '/images/avatar_5.webp');
  fr7 = fr7.replace(/https:\/\/framerusercontent\.com\/images\/yARciMvkc19ipMBRHX0dYXb08\.webp[^\s"'`]*/g, '/images/craft_feature_1.webp');

  fs.writeFileSync(fr7Path, fr7, 'utf-8');
  console.log('✓ fr7 (Reviews) updated successfully!');
}

console.log('--- 2. Updating About Page in kUR3CfpW9NIyRzidNwuOKmKl470PoGVqflldEj15ME4.Sg5Y4YBO.mjs ---');
const kurPath = path.join(projectDir, 'scripts/kUR3CfpW9NIyRzidNwuOKmKl470PoGVqflldEj15ME4.Sg5Y4YBO.mjs');
if (fs.existsSync(kurPath)) {
  let kur = fs.readFileSync(kurPath, 'utf-8');

  // Replace "Our Vision" with "Our Vision"
  kur = kur.replace(/text:`Our Vision`/g, 'text:`Our Vision`');

  // Replace Philosophy text
  kur = kur.replace(
    /Somewhere between quiet minimalism and warm coziness[\s\S]*?personal home away from home\./g,
    'Somewhere between majestic Awadhi heritage and modern architectural grandeur, you’ll find spaces designed to elevate life’s greatest milestones. Not just a banquet hall, but an enduring estate for extraordinary weddings, receptions, and celebrations.'
  );

  // Replace "Architectural Poise & Estate Hospitality" with "Architectural Poise & Estate Hospitality"
  kur = kur.replace(/text:`Architectural Poise & Estate Hospitality`/g, 'text:`Architectural Poise & Estate Hospitality`');

  // Replace Moritz bio
  kur = kur.replace(
    /I studied tourism and spent many years working in restaurants[\s\S]*?welcoming you to The Grand\./g,
    'Founded with a singular commitment to exceptional celebration experiences, The Grand pairs expansive pillarless banquet halls with lush, landscaped outdoor lawns in Gomti Nagar. Our experienced culinary artisans and dedicated event coordinators orchestrate every occasion with grace, ensuring every ritual, feast, and celebration unfolds flawlessly. What matters most to us: seamless service, grand architectural presence, and memories that endure for a lifetime. We look forward to welcoming you and your guests to The Grand.'
  );

  // Replace Locations description
  kur = kur.replace(
    /The Grand venues all sit in Lucknow's historic old town[\s\S]*?right outside your window\./g,
    'The Grand is situated in the prime cultural and celebratory hub of Gomti Nagar, Lucknow. Surrounded by serene landscaped greens, convenient arterial access, and dedicated valet parking for over 1,500 vehicles. Architectural poise, premier luxury facilities, and Lucknow’s finest celebration estate right at your service.'
  );

  // Replace image URLs in about page
  kur = kur.replace(/https:\/\/framerusercontent\.com\/images\/Urg4dkPDgTjDQTcsFiBUcAUnQY\.webp[^\s"'`]*/g, '/images/craft_feature_1.webp');
  kur = kur.replace(/https:\/\/framerusercontent\.com\/images\/TFev0KcDs0RM4c4vesBPXCQMpo\.webp[^\s"'`]*/g, '/images/craft_feature_2.webp');
  kur = kur.replace(/https:\/\/framerusercontent\.com\/images\/yARciMvkc19ipMBRHX0dYXb08\.webp[^\s"'`]*/g, '/images/card_1_open_earth.webp');

  fs.writeFileSync(kurPath, kur, 'utf-8');
  console.log('✓ kUR (About page) updated successfully!');
}

console.log('--- 3. Updating Home Page in IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs ---');
const istPath = path.join(projectDir, 'scripts/IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs');
if (fs.existsSync(istPath)) {
  let ist = fs.readFileSync(istPath, 'utf-8');

  // Replace Locations description
  ist = ist.replace(
    /The Grand venues all sit in Lucknow's historic old town[\s\S]*?right outside your window\./g,
    'The Grand is located in the prestigious Gomti Nagar area of Lucknow, offering serene landscaped lawns, exceptional connectivity, and extensive private parking. Architectural grace, expansive banquet spaces, and premier event hospitality right at your service.'
  );

  fs.writeFileSync(istPath, ist, 'utf-8');
  console.log('✓ IStDm (Home page) updated successfully!');
}

console.log('--- 4. Updating Other Route Scripts with Framer Images ---');
const otherFiles = [
  'scripts/dp5RxapaCfSZDIUmJAPG-pqEe4sCQP3YFN6nZtPiSRo.BJjlHCZa.mjs',
  'scripts/nteO2IV_oruZhnTtyytdbfV2QtZZPjMtQEspCiom9d8.B30j0rWH.mjs',
  'scripts/T5PVEAy5F.D5-RUb5a.mjs'
];

for (const rel of otherFiles) {
  const full = path.join(projectDir, rel);
  if (fs.existsSync(full)) {
    let text = fs.readFileSync(full, 'utf-8');
    text = text.replace(/https:\/\/framerusercontent\.com\/images\/K2SI0qg2wUTh96nxv8SxprMIZGA\.webp[^\s"'`]*/g, '/images/craft_feature_1.webp');
    text = text.replace(/https:\/\/framerusercontent\.com\/images\/pw6DKYapLEIHHdPup4QPYAlcWQ\.webp[^\s"'`]*/g, '/images/craft_feature_2.webp');
    text = text.replace(/https:\/\/framerusercontent\.com\/images\/vTwSnhwsBAsH5peD56zyOMpM\.jpg[^\s"'`]*/g, '/images/hero_bg.webp');
    fs.writeFileSync(full, text, 'utf-8');
    console.log(`✓ Updated ${rel}`);
  }
}

console.log('--- 5. Updating index.html ---');
const indexPath = path.join(projectDir, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf-8');

// Replace THE%20GRAND%20LUCKNOW with THE%20GRAND in index.html
indexHtml = indexHtml.replaceAll('THE%20GRAND%20LUCKNOW', 'THE%20GRAND');
indexHtml = indexHtml.replaceAll('THE GRAND LUCKNOW', 'THE GRAND');

// Ensure any remaining Framer CDN script URLs are redirected
indexHtml = indexHtml.replaceAll('https://framerusercontent.com/sites/1bk9uGIcxVnDnwzQnwlcko/', '/scripts/');

fs.writeFileSync(indexPath, indexHtml, 'utf-8');
console.log('✓ index.html updated successfully!');
