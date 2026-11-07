import fs from 'node:fs';
import path from 'node:path';

// 1. Build refined universal footer snippet
let css = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/footer_rules.css', 'utf8');
css = css.replace(/\.framer-zrroz\s+/g, '');

const extraCss = `
  footer.framer-18na9ah {
    background-color: var(--token-86299043-b8f8-4618-9585-4835ac76e9b7, #bc6f45) !important;
    width: 100% !important;
    max-width: 100% !important;
    display: flex !important;
    position: relative !important;
    justify-content: center !important;
    align-items: center !important;
    overflow: hidden !important;
    box-sizing: border-box !important;
    height: auto !important;
    min-height: 934px !important;
    padding: 0 !important;
  }
  footer.framer-18na9ah * {
    box-sizing: border-box !important;
  }
  footer.framer-18na9ah .framer-192t1bg-container {
    width: 100% !important;
    height: 100% !important;
    position: relative !important;
    opacity: 1 !important;
    transform: none !important;
  }
  footer.framer-18na9ah .framer-1aamxx2 {
    width: 100% !important;
    max-width: 1600px !important;
    margin: 0 auto !important;
    padding: 256px 48px 48px !important;
    height: auto !important;
    min-height: 934px !important;
    gap: 80px !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-end !important;
    align-items: center !important;
    opacity: 1 !important;
    transform: none !important;
  }
  @media (max-width: 809.98px) {
    footer.framer-18na9ah .framer-1aamxx2 {
      padding: 120px 24px 32px !important;
      gap: 48px !important;
      min-height: 600px !important;
    }
    footer.framer-18na9ah {
      min-height: 600px !important;
    }
  }
  footer.framer-18na9ah a {
    text-decoration: none !important;
  }
`;

css += '\n' + extraCss;

let footerHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/rendered_home_footer.html', 'utf8');

// Ensure all opacities inside are 1 and transforms none
footerHtml = footerHtml.replace(/opacity:\s*(?:0(?:\.\d+)?|1);/g, 'opacity: 1;');
footerHtml = footerHtml.replace(/transform:\s*translateY\(-210px\);/g, 'transform: none;');
footerHtml = footerHtml.replace(/transform:\s*translateY\(10px\);/g, 'transform: none;');

const svgDef = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/footer_logo_svg.html', 'utf8');

const universalFooter = `
<!-- ========================================== -->
<!-- UNIVERSAL FOOTER (MATCHING HOME PAGE 1:1) -->
<!-- ========================================== -->
<style id="universal-grand-footer-styles">
${css}
</style>

<div style="display:none;" aria-hidden="true">
${svgDef}
</div>

${footerHtml}
<!-- ========================================== -->
`;

const root = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

const targetPages = [
  'venues/open-earth-lawn.html',
  'venues/venue-n1.html',
  'venues/venue-n2.html',
  'venues/venue-n3.html',
  'venues/venue-n4.html',
  'venues/venue-n5.html',
  'venues/boutique-n1.html',
  'venues/boutique-n2.html',
  'venues/boutique-n3.html',
  'venues/boutique-n4.html',
  'venues/boutique-n5.html',
  'venues/loft-n1.html',
  'apartments/boutique-n1.html',
  'apartments/boutique-n2.html',
  'apartments/boutique-n3.html',
  'apartments/boutique-n4.html',
  'apartments/boutique-n5.html',
  'apartments/loft-n1.html',
  'venues.html',
  'about.html',
  'contact.html',
  'imprint.html',
  'terms.html',
  'privacy.html'
];

let appliedCount = 0;
for (const rel of targetPages) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) continue;

  let content = fs.readFileSync(full, 'utf8');

  // 1. Remove any existing universal-grand-footer-styles
  content = content.replace(/<style id="universal-grand-footer-styles">[\s\S]*?<\/style>/g, '');
  content = content.replace(/<!-- ========================================== -->[\s\S]*?<!-- UNIVERSAL FOOTER[\s\S]*?<!-- ========================================== -->/g, '');

  // 2. Find <footer ...>...</footer>
  const fIdx = content.indexOf('<footer');
  if (fIdx === -1) {
    console.log(`No footer found in ${rel}, skipping`);
    continue;
  }
  const fEnd = content.indexOf('</footer>', fIdx) + 9;

  content = content.slice(0, fIdx) + universalFooter + content.slice(fEnd);

  // 3. Protect footer from any allNodes text replacement script
  if (content.includes("allNodes.forEach(function(el) {")) {
    content = content.replace(
      "allNodes.forEach(function(el) {\n      if (el.children.length === 0",
      "allNodes.forEach(function(el) {\n      if (el.closest('footer')) return;\n      if (el.children.length === 0"
    );
  }

  fs.writeFileSync(full, content, 'utf8');
  console.log(`Updated universal footer in: ${rel}`);
  appliedCount++;
}

console.log(`\nSuccessfully applied universal footer to ${appliedCount} pages!`);
