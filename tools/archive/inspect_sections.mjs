import fs from 'fs';

const content = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// 1. Gallery images
const imgMatches = [];
const imgRegex = /<img [^>]*>/g;
let match;
while ((match = imgRegex.exec(content)) !== null) {
  if (match[0].includes('CVXtCf6tZR6dJm2eWWVQtlAQ') ||
      match[0].includes('vdC19zZ0zxxk4ZeoeHw8fvtyjY') ||
      match[0].includes('SddmKT60VwqookDK5SjzoRisU') ||
      match[0].includes('Kl8CafSwMaWFZNyMbuVHEagIE') ||
      match[0].includes('udW0XMjifUBJrksLR03ScdX72U8') ||
      match[0].includes('jucoMWZeVI2eh02fLXEfvUJsSg')) {
    imgMatches.push({ index: match.index, tag: match[0] });
  }
}
console.log('Found gallery images:', imgMatches.length);
imgMatches.forEach((m, idx) => {
  console.log(`Image ${idx + 1} at offset ${m.index}: ${m.tag.slice(0, 100)}...`);
});

// 2. Room/space caption containers <div class="framer-1dt4o5i">
const captionRegex = /<div class="framer-1dt4o5i"[\s\S]*?<\/div>/g;
let capMatch;
let capCount = 0;
while ((capMatch = captionRegex.exec(content)) !== null) {
  capCount++;
  console.log(`Caption ${capCount}:`, capMatch[0]);
}

// 3. Slide counter format
const counterRegex = /<div class="framer-1denn2w"[\s\S]*?<\/div>[\s\S]*?<div class="framer-1fsmaa4"[\s\S]*?<\/div>/g;
let countMatch;
let cCount = 0;
while ((countMatch = counterRegex.exec(content)) !== null) {
  cCount++;
  console.log(`Counter ${cCount}:`, countMatch[0]);
}

// 4. framer-6rg8a
console.log('framer-6rg8a occurrences:', (content.match(/framer-6rg8a/g) || []).length);
