import fs from 'fs';

const home = fs.readFileSync('index.html', 'utf8');

// Extract footer from index.html
const footerMatch = home.match(/<footer[\s\S]*?<\/footer>/);
if (!footerMatch) {
  console.error('Footer not found in index.html!');
  process.exit(1);
}
let footer = footerMatch[0];

// In index.html, there are two variants:
// 1. Desktop: <div class="ssr-variant hidden-o5o8qi">
// 2. Mobile: <div class="ssr-variant hidden-72rtr7 hidden-p8zd8m">

// Replace ticker in both variants with the pure CSS 2-track marquee ticker
const tickerRegex = /<div class="framer-n49p1z"[^>]*data-framer-name="Footer Logo"[^>]*>[\s\S]*?<\/ul><\/div>/g;

const pureCssTicker = `<div class="framer-n49p1z grand-ticker-container" data-framer-name="Footer Logo">
  <div class="grand-ticker-track track-a">
    <div class="ticker-item"><div class="framer-xj8hz2" aria-label="THE GRAND"></div></div>
    <div class="ticker-item"><div class="framer-xj8hz2" aria-label="THE GRAND"></div></div>
  </div>
  <div class="grand-ticker-track track-b" aria-hidden="true">
    <div class="ticker-item"><div class="framer-xj8hz2" aria-label="THE GRAND"></div></div>
    <div class="ticker-item"><div class="framer-xj8hz2" aria-label="THE GRAND"></div></div>
  </div>
</div>`;

footer = footer.replace(tickerRegex, pureCssTicker);

// Clean up rolling labels and character splitting:
// Replace <span data-rolling-label[\s\S]*?<\/span><!--\/\$-->
// with a clean solid text span
const rollingLabelRegex = /<span data-rolling-label[^>]*>([\s\S]*?)<\/span>/g;

footer = footer.replace(rollingLabelRegex, (match) => {
  // Extract the screen-reader label or text
  const srMatch = match.match(/<span style="[^"]*clip:rect\(0 0 0 0\)[^"]*">([^<]+)<\/span>/);
  let label = srMatch ? srMatch[1].trim() : '';
  if (!label) {
    // try to extract characters from visibility:hidden
    const chars = [...match.matchAll(/<span style="visibility:hidden">([^<]+)<\/span>/g)].map(m => m[1]).join('');
    label = chars || '';
  }
  if (label === 'Apartments' || label === 'Boutique' || label === 'Venue' || label === 'Venues') {
    label = 'Venues';
  } else if (label === 'About') {
    label = 'About';
  } else if (label === 'Contact') {
    label = 'Contact';
  } else if (label === 'Instagram') {
    label = 'Instagram';
  } else if (label === 'Facebook' || label === 'LinkedIn') {
    label = 'Facebook';
  } else if (label === 'Imprint') {
    label = 'Imprint';
  } else if (label === 'Terms') {
    label = 'Terms';
  } else if (label === 'Privacy') {
    label = 'Privacy';
  } else if (label.includes('@')) {
    label = 'Thegrandbanquet07@gmail.com';
  } else if (label.includes('+') || label.includes('43') || label.includes('91')) {
    label = '+91 91291 27091';
  }
  return `<span class="grand-footer-link-text">${label}</span>`;
});

// Force all initial hidden states to visible in the footer
// Replace opacity: 0 and opacity: 0.1 with opacity: 1; transform: none;
footer = footer.replace(/opacity:\s*(?:0|0\.1)(;|\")/g, 'opacity: 1$1');
footer = footer.replace(/transform:\s*translateY\(-?[0-9]+px\)/g, 'transform: none');

// Ensure hrefs match subpage routing
footer = footer.replaceAll('href="./venues"', 'href="/venues"');
footer = footer.replaceAll('href="./about"', 'href="/about"');
footer = footer.replaceAll('href="./contact"', 'href="/contact"');
footer = footer.replaceAll('href="./imprint"', 'href="/imprint"');
footer = footer.replaceAll('href="./terms"', 'href="/terms"');
footer = footer.replaceAll('href="./privacy"', 'href="/privacy"');
footer = footer.replaceAll('tel:+436641999605', 'tel:+919129127091');
footer = footer.replaceAll('+43 664 1999605', '+91 91291 27091');
footer = footer.replaceAll('office@casamomo.at', 'Thegrandbanquet07@gmail.com');
footer = footer.replaceAll('Thegrandbanquet07@gmail.com', 'Thegrandbanquet07@gmail.com');
footer = footer.replaceAll('https://nexene.at/', 'https://elvar.in/edifice');
footer = footer.replaceAll('https://nexene.at', 'https://elvar.in/edifice');
footer = footer.replaceAll('Nexene', 'Edifice');

console.log('Resulting footer length:', footer.length);
console.log('Contains ssr-variant hidden-o5o8qi:', footer.includes('hidden-o5o8qi'));
console.log('Contains ssr-variant hidden-72rtr7:', footer.includes('hidden-72rtr7'));
console.log('Contains grand-ticker-container:', footer.includes('grand-ticker-container'));

// Check for any remaining split letters
const remainingSplit = footer.includes('visibility:hidden');
console.log('Remaining split characters (expected false):', remainingSplit);

fs.writeFileSync('tools/generated_footer.html', footer, 'utf8');
console.log('Saved generated footer to tools/generated_footer.html');
