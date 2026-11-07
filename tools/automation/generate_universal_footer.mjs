import fs from 'node:fs';

// 1. Read footer rules
let css = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/footer_rules.css', 'utf8');

// Generalize rules so they don't depend on .framer-zrroz
css = css.replace(/\.framer-zrroz\s+/g, '');

// Also add critical universal fallback rules for .framer-18na9ah
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
    min-height: 688px !important;
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
    padding: 120px 48px 48px !important;
  }
  @media (max-width: 809.98px) {
    footer.framer-18na9ah .framer-1aamxx2 {
      padding: 80px 24px 32px !important;
    }
  }
  footer.framer-18na9ah a {
    text-decoration: none !important;
  }
`;

css += '\n' + extraCss;

// 2. Read rendered footer HTML
let footerHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/rendered_home_footer.html', 'utf8');

// Clean up any lingering partial opacities in inline styles
footerHtml = footerHtml.replace(/opacity:\s*(?:0(?:\.\d+)?|1);/g, 'opacity: 1;');
footerHtml = footerHtml.replace(/transform:\s*translateY\(-210px\);/g, 'transform: none;');
footerHtml = footerHtml.replace(/transform:\s*translateY\(10px\);/g, 'transform: none;');

// 3. Read SVG logo definition
const svgDef = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/footer_logo_svg.html', 'utf8');

// Combine into single clean universal footer snippet
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

fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/universal_footer_snippet.html', universalFooter, 'utf8');
console.log('universal_footer_snippet.html generated successfully! Length:', universalFooter.length);
