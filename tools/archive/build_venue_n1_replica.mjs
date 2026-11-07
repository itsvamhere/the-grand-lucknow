import fs from 'fs';

const origPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/casamomo_boutique_n1_original.html';
const destPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n1.html';

let html = fs.readFileSync(origPath, 'utf8');

// 1. Decouple Framer React Hydration runtime that overrides SSR content to 404
html = html.replace(/<script[^>]*script_main[^>]*><\/script>/g, '');
html = html.replace(/<script type="framer\/handover"[^>]*>[\s\S]*?<\/script>/g, '');

// 2. SEO & Title: Align to The Grand Lucknow while keeping Boutique N°1 content
html = html.replace(/<title>[^<]*<\/title>/, '<title>Boutique N°1 • The Grand Lucknow</title>');

// 3. Logo & Brand: Update Casa Momo logo in nav to THE GRAND
const theGrandDesktopSvg = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/tools/the_grand_footer_desktop.svg', 'utf8');
const desktopBgImage = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/tools/the_grand_footer_bg_image.txt', 'utf8');

// Replace footer background image if present
const bgRegex = /background-image:url\('data:image\/svg\+xml,[^']+'\)/g;
if (bgRegex.test(html)) {
  html = html.replace(bgRegex, `background-image:url('${desktopBgImage}')`);
}

// 4. Update Nav Links (Apartments -> Venues, Book Now -> Inquire Now)
html = html.replaceAll('Apartments</span>', 'Venues</span>');
html = html.replaceAll('Apartments</p>', 'Venues</p>');
html = html.replaceAll('Book Now</span>', 'Inquire Now</span>');
html = html.replaceAll('Book Now</p>', 'Inquire Now</p>');
html = html.replaceAll('href="./apartments"', 'href="/#venues"');
html = html.replaceAll('href="/apartments"', 'href="/#venues"');
html = html.replaceAll('href="./#apartments"', 'href="/#venues"');
html = html.replaceAll('href="/#apartments"', 'href="/#venues"');
html = html.replaceAll('href="./#about"', 'href="/#about"');
html = html.replaceAll('href="./#contact"', 'href="/#contact"');

// 5. Injected Client Fix script: Ensures header displays THE GRAND logo cleanly and smooth scrolls
const injectedScript = `
<script id="grand-venue-replica-fix">
(function() {
  function fixBranding() {
    // 1. Brand Logo in Navbar
    var logoSvgs = document.querySelectorAll('.framer-1j5k357 a svg, .framer-gaygr9 svg, .framer-1a4iuvt svg');
    logoSvgs.forEach(function(svg) {
      if (!svg.getAttribute('data-grand-fixed')) {
        svg.setAttribute('data-grand-fixed', 'true');
        svg.innerHTML = '<text x="0" y="22" font-family="Lay Grotesk, serif, sans-serif" font-size="24" font-weight="700" letter-spacing="0.1em" fill="currentColor">THE GRAND</text>';
        svg.setAttribute('viewBox', '0 0 180 30');
      }
    });

    // 2. Ensure logo links to /
    var logoLinks = document.querySelectorAll('a[href="/"], a[href="./"], a[href="./apartments"], a[aria-label="Casa Momo"], a[aria-label="The Grand"]');
    logoLinks.forEach(function(a) {
      if (a.querySelector('svg[data-grand-fixed]')) {
        a.setAttribute('href', '/');
        a.setAttribute('aria-label', 'The Grand Lucknow');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixBranding);
  } else {
    fixBranding();
  }
  setTimeout(fixBranding, 500);
  setTimeout(fixBranding, 1500);
})();
</script>
`;

if (!html.includes('grand-venue-replica-fix')) {
  html = html.replace('</body>', `${injectedScript}</body>`);
}

fs.writeFileSync(destPath, html, 'utf8');
console.log('Successfully built venue-n1.html as 1:1 replica of Boutique N°1!');
