import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');
const subpageHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

console.log('=== HOMEPAGE ===');
// Search for headers and navigation
const homeHeaders = homeHtml.match(/<header[\s\S]*?<\/header>/gi) || [];
console.log('Home headers count:', homeHeaders.length);
homeHeaders.forEach((h, i) => {
  const cls = (h.match(/class="([^"]+)"/) || [])[1];
  console.log(`Header ${i}: class="${cls}", length=${h.length}`);
});

// Search for footer in homepage
const homeFooters = homeHtml.match(/<footer[\s\S]*?<\/footer>/gi) || [];
console.log('Home footers count:', homeFooters.length);
if (homeFooters.length > 0) {
  const fCls = (homeFooters[0].match(/class="([^"]+)"/) || [])[1];
  console.log(`Home footer: class="${fCls}", length=${homeFooters[0].length}`);
}

console.log('\n=== SUBPAGE ===');
const subHeaders = subpageHtml.match(/<header[\s\S]*?<\/header>/gi) || [];
console.log('Subpage headers count:', subHeaders.length);
subHeaders.forEach((h, i) => {
  const cls = (h.match(/class="([^"]+)"/) || [])[1];
  console.log(`Subpage Header ${i}: class="${cls}", length=${h.length}`);
});

const subFooters = subpageHtml.match(/<footer[\s\S]*?<\/footer>/gi) || [];
console.log('Subpage footers count:', subFooters.length);
if (subFooters.length > 0) {
  const fCls = (subFooters[0].match(/class="([^"]+)"/) || [])[1];
  console.log(`Subpage footer: class="${fCls}", length=${subFooters[0].length}`);
}
