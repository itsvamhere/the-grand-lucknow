import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');
const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

console.log('=== CHECKING VENUES / ABOUT / CONTACT IN SUBPAGE ===');
const venuesMatches = [...subHtml.matchAll(/Venues/gi)];
console.log('Venues occurrences in subpage:', venuesMatches.length);

// Let's find footer links in subpage
const subFooterMatch = subHtml.match(/<footer[\s\S]*?<\/footer>/i);
if (subFooterMatch) {
  const footerContent = subFooterMatch[0];
  const vIdx = footerContent.indexOf('Venues');
  if (vIdx !== -1) {
    console.log('Footer Venues context in subpage:\n', footerContent.slice(Math.max(0, vIdx - 200), vIdx + 300));
  } else {
    console.log('Venues not found directly in subpage footer. Let us search for "nues":');
    const nIdx = footerContent.indexOf('nues');
    if (nIdx !== -1) {
      console.log('Footer "nues" context:\n', footerContent.slice(Math.max(0, nIdx - 200), nIdx + 300));
    }
  }
}

// Compare with home footer
const homeFooterMatch = homeHtml.match(/<footer[\s\S]*?<\/footer>/i);
if (homeFooterMatch) {
  const vIdx = homeFooterMatch[0].indexOf('Venues');
  if (vIdx !== -1) {
    console.log('Footer Venues context in HOME:\n', homeFooterMatch[0].slice(Math.max(0, vIdx - 200), vIdx + 300));
  }
}
