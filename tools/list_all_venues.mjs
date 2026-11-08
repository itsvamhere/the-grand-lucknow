import fs from 'fs';

console.log('--- 1. Checking venues directory ---');
if (fs.existsSync('venues')) {
  console.log(fs.readdirSync('venues'));
}

console.log('\n--- 2. Checking venue links in index.html ---');
const home = fs.readFileSync('index.html', 'utf8');
const vLinks = home.match(/href="(?:\.\/|\/)venues\/[^"]+"/gi) || [];
console.log('Venue links in index.html:', [...new Set(vLinks)]);

console.log('\n--- 3. Checking venues.html if exists ---');
if (fs.existsSync('venues.html')) {
  const venuesPage = fs.readFileSync('venues.html', 'utf8');
  const vPageLinks = venuesPage.match(/href="(?:\.\/|\/)?(?:venues\/)?[^"]+"/gi) || [];
  const venueSubs = vPageLinks.filter(l => l.includes('lawn') || l.includes('hall') || l.includes('banquet') || l.includes('venues/'));
  console.log('Venue links in venues.html:', [...new Set(venueSubs)]);
}

console.log('\n--- 4. Checking images/venues directory ---');
if (fs.existsSync('images/venues')) {
  console.log(fs.readdirSync('images/venues'));
}
