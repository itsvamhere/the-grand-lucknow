import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const ROOT = path.resolve('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo');

console.log('=== FORENSIC INTEGRITY AUDIT (ITERATION 2) ===\n');

// 1. Untouchable index.html
const indexPath = path.join(ROOT, 'index.html');
const indexStat = fs.statSync(indexPath);
const indexBuf = fs.readFileSync(indexPath);
const indexHash = crypto.createHash('sha256').update(indexBuf).digest('hex').toUpperCase();

console.log('1. UNTOUCHABLE FILE CHECK (index.html):');
console.log('   Path:', indexPath);
console.log('   Size:', indexStat.size, 'bytes');
console.log('   mtime:', indexStat.mtime.toISOString());
console.log('   SHA256:', indexHash);
const indexClean = (indexStat.size === 871500) && (indexHash === '40DE9D3F4473DC593C336852AD8020C2E3902E0308D05852CBF9C918B86EFE5C');
console.log('   Verdict:', indexClean ? 'PASS (Untouched)' : 'FAIL (Tampered)');

// 2. Asset Authenticity
const userSourcePath = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1794032332967_bb41bc6b.jpg';
const targetAssetPath = path.join(ROOT, 'images/venues/the_grand_open_earth_lawn_hero.jpg');

const srcBuf = fs.readFileSync(userSourcePath);
const dstBuf = fs.readFileSync(targetAssetPath);
const srcHash = crypto.createHash('sha256').update(srcBuf).digest('hex').toUpperCase();
const dstHash = crypto.createHash('sha256').update(dstBuf).digest('hex').toUpperCase();

console.log('\n2. ASSET AUTHENTICITY CHECK (the_grand_open_earth_lawn_hero.jpg):');
console.log('   Source:', userSourcePath);
console.log('   Target:', targetAssetPath);
console.log('   Source Size:', srcBuf.length, 'bytes');
console.log('   Target Size:', dstBuf.length, 'bytes');
console.log('   Source SHA256:', srcHash);
console.log('   Target SHA256:', dstHash);
const assetClean = (srcBuf.length === dstBuf.length) && (srcHash === dstHash) && srcBuf.equals(dstBuf);
console.log('   Exact Binary Equality:', assetClean ? 'PASS (100% Authentic)' : 'FAIL (Tampered / Mismatched)');

// 3. Code Authenticity in venues/open-earth-lawn.html
const subpagePath = path.join(ROOT, 'venues/open-earth-lawn.html');
const subpageHtml = fs.readFileSync(subpagePath, 'utf8');

console.log('\n3. CODE AUTHENTICITY & IMPLEMENTATION INTEGRITY (venues/open-earth-lawn.html):');

// Check gallery images
const galleryMatches = [...subpageHtml.matchAll(/src=["'](\/images\/venues\/the_grand_open_earth_lawn_hero\.jpg[^"']*)["']/g)];
console.log('   Gallery slides using authentic user photo:', galleryMatches.length, '/ 6 expected');

// Check gallery numbering fractions
const fractions = [...subpageHtml.matchAll(/<p[^>]*>([1-6]\/6)<\/p>/g)].map(m => m[1]);
console.log('   Gallery fraction labels found:', fractions.join(', '));

// Check room text removal
const hasLivingRoom = subpageHtml.includes('Living Room');
const hasBedroom = subpageHtml.includes('Bedroom');
console.log('   Contains legacy "Living Room" text:', hasLivingRoom);
console.log('   Contains legacy "Bedroom" text:', hasBedroom);

// Check Other Venues cards
const hasCard2 = subpageHtml.includes('/images/card_2_grassland_gala.webp');
const hasCard3 = subpageHtml.includes('/images/card_3_ballroom.webp');
console.log('   Other Venues Card 2 (Grassland Gala) present:', hasCard2);
console.log('   Other Venues Card 3 (Garden Galaxy) present:', hasCard3);

// Check Other Venues numbers
const hasGrassland55k = subpageHtml.includes('55,000');
const hasGrassland1500 = subpageHtml.includes('1,500');
const hasGarden45k = subpageHtml.includes('45,000');
const hasGarden1000 = subpageHtml.includes('1,000');
const hasApartment120 = subpageHtml.includes('>120<');
console.log('   Grassland Gala specs (55,000 Sqft / 1,500 guests):', hasGrassland55k && hasGrassland1500);
console.log('   Garden Galaxy specs (45,000 Sqft / 1,000 guests):', hasGarden45k && hasGarden1000);
console.log('   Contains legacy apartment "120" placeholder:', hasApartment120);

// Check superscript suppression
const hasSuperscriptRule = subpageHtml.includes('.framer-84xumc') && subpageHtml.includes('display: none !important');
console.log('   Superscript suppression rule (.framer-84xumc display: none):', hasSuperscriptRule);

// Check map pin coordinates
const hasCenterPointer = subpageHtml.includes('left: 50% !important') && subpageHtml.includes('top: 50% !important');
console.log('   Map pin anchored to true center (50%, 50%):', hasCenterPointer);

// Check marquee gap fix
const hasMarqueeGap0 = subpageHtml.includes('.grand-ticker-container') && subpageHtml.includes('gap: 0 !important');
console.log('   Marquee gap: 0 !important rule:', hasMarqueeGap0);

// Check for test harness cheating or facades
const cheatingPatterns = [
  /__playwright_eval/,
  /window\.__MOCK/,
  /window\.__TEST_HARNESS/,
  /function\s+dummy\(/,
  /return\s+["']PASS["']/,
  /isCheating/
];
const cheatingDetected = cheatingPatterns.filter(p => p.test(subpageHtml));
console.log('   Cheating/Harness signatures detected:', cheatingDetected.length === 0 ? '0 (CLEAN)' : cheatingDetected);

console.log('\n=== AUDIT CHECKS COMPLETE ===');
