import fs from 'fs';
import path from 'path';

const root = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const theGrandD = fs.readFileSync(path.join(root, 'tools/the_grand_matched_d.txt'), 'utf8').trim();
const MAPS_LINK = 'https://maps.app.goo.gl/94Dr1K1iPbZ3kR117';

function updateFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  let originalLen = html.length;

  // 1. Replace CASA MOMO path in svg-1334768056_3843
  // Match <svg ... id="svg-1334768056_3843"><path d="[^"]+"
  const svgIdRegex = /(<svg[^>]*id="svg-1334768056_3843"[^>]*><path\s+d=")([^"]+)(")/g;
  html = html.replace(svgIdRegex, `$1${theGrandD}$3`);

  // Also replace old CASA MOMO d if present anywhere else in SVGs
  const oldCasaD = "M 82.756 0.433 L 77.962 0.433";
  if (html.includes(oldCasaD)) {
    console.log(`Found old Casa Momo d in ${path.basename(filePath)}, replacing...`);
    const oldDRegex = /d="M 82\.756 0\.433[^"]+"/g;
    html = html.replace(oldDRegex, `d="${theGrandD}"`);
  }

  // 2. Replace <img> logo references
  html = html.replaceAll('https://framerusercontent.com/images/AR2Rq8AO90zXACnVeViCZnmOhw.svg?width=216&amp;height=27', '/images/logo-light.svg');
  html = html.replaceAll('https://framerusercontent.com/images/AR2Rq8AO90zXACnVeViCZnmOhw.svg', '/images/logo-light.svg');
  html = html.replaceAll('alt="Casa Momo"', 'alt="The Grand Lucknow"');
  html = html.replaceAll('aria-label="Casa Momo – Home"', 'aria-label="The Grand Lucknow – Home"');
  html = html.replaceAll('aria-label="Casa Momo"', 'aria-label="The Grand Lucknow"');

  // 3. Update Logo links to "/"
  // Logo links are <a ... data-framer-name="Logo" href="../"
  html = html.replace(/(<a[^>]*data-framer-name="Logo"[^>]*href=")[^"]*(")/g, '$1/$2');

  // 4. Update Nav Links in Navbar
  // Apartments -> Venues
  html = html.replace(/(<a[^>]*href=")(?:\.\.\/|\.\/|\/)apartments(")/g, '$1/#venues$2');
  html = html.replaceAll('>Apartments</span>', '>Venues</span>');
  html = html.replaceAll('>Apartments</p>', '>Venues</p>');
  
  // Clean rolling label for Venues
  const rollingApartments = /<span data-rolling-label[^>]*><span[^>]*>Apartments<\/span>[\s\S]*?<\/span><!--\/\$-->/g;
  html = html.replace(rollingApartments, `<span style="font-family:'Lay Grotesk Regular', sans-serif;font-size:17px;color:rgb(255, 240, 202);position:relative;display:inline-block;white-space:nowrap;user-select:none;vertical-align:top">Venues</span><!--/$-->`);

  // About -> /#about
  html = html.replace(/(<a[^>]*href=")(?:\.\.\/|\.\/|\/)about(")/g, '$1/#about$2');
  const rollingAbout = /<span data-rolling-label[^>]*><span[^>]*>About<\/span>[\s\S]*?<\/span><!--\/\$-->/g;
  html = html.replace(rollingAbout, `<span style="font-family:'Lay Grotesk Regular', sans-serif;font-size:17px;color:rgb(255, 240, 202);position:relative;display:inline-block;white-space:nowrap;user-select:none;vertical-align:top">About</span><!--/$-->`);

  // Contact -> /#contact
  html = html.replace(/(<a[^>]*href=")(?:\.\.\/|\.\/|\/)contact(")/g, '$1/#contact$2');
  const rollingContact = /<span data-rolling-label[^>]*><span[^>]*>Contact<\/span>[\s\S]*?<\/span><!--\/\$-->/g;
  html = html.replace(rollingContact, `<span style="font-family:'Lay Grotesk Regular', sans-serif;font-size:17px;color:rgb(255, 240, 202);position:relative;display:inline-block;white-space:nowrap;user-select:none;vertical-align:top">Contact</span><!--/$-->`);

  // 5. Replace Button: Book Now / Inquire Now -> Open in Maps ↗
  // Target: <a class="framer-vO7O2 framer-9t14z3 framer-v-wf9qrl framer-1swxj4p" ... href="../book" ...
  // Or any href="...book"
  html = html.replace(/(<a[^>]*class="[^"]*framer-vO7O2[^"]*"[^>]*href=")[^"]*(")/g, `$1${MAPS_LINK}" target="_blank" rel="noopener noreferrer$2`);
  html = html.replace(/(<a[^>]*href=")(?:\.\.\/|\.\/|\/)book(")/g, `$1${MAPS_LINK}" target="_blank" rel="noopener noreferrer$2`);
  
  // Clean rolling label for Open in Maps button
  const rollingBookNow = /<span data-rolling-label[^>]*><span[^>]*>(?:Book Now|Inquire Now)<\/span>[\s\S]*?<\/span><!--\/\$-->/g;
  html = html.replace(rollingBookNow, `<span style="font-family:'Lay Grotesk Regular', sans-serif;font-size:17px;color:rgb(14, 18, 1);position:relative;display:inline-block;white-space:nowrap;user-select:none;vertical-align:top;margin-right:6px">Open in Maps</span><!--/$-->`);

  // Also catch generic Inquire Now / Book Now text spans
  html = html.replaceAll('>Book Now<', '>Open in Maps<');
  html = html.replaceAll('>Inquire Now<', '>Open in Maps<');

  // 6. Injected Client Verification script to keep navbar rock-solid
  const clientScript = `
<script id="grand-nav-sync">
(function() {
  function syncNav() {
    // 1. Logo text and SVG
    document.querySelectorAll('a[data-framer-name="Logo"]').forEach(function(a) {
      a.setAttribute('href', '/');
      a.setAttribute('aria-label', 'The Grand Lucknow');
      var img = a.querySelector('img');
      if (img && img.src.indexOf('logo-light.svg') === -1) {
        img.src = '/images/logo-light.svg';
        img.alt = 'The Grand Lucknow';
      }
    });

    // 2. Open in Maps CTA button
    document.querySelectorAll('nav a, header a').forEach(function(a) {
      var txt = a.textContent.trim();
      if (txt.indexOf('Book Now') !== -1 || txt.indexOf('Inquire Now') !== -1 || txt.indexOf('Open in Maps') !== -1) {
        a.href = '${MAPS_LINK}';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        // Ensure clean text display
        var roll = a.querySelector('.framer-nbr5p7-container, [data-code-component-plugin-id="api"]');
        if (roll && roll.textContent.indexOf('Open in Maps') === -1) {
          roll.innerHTML = '<span style="font-family:\\'Lay Grotesk Regular\\', sans-serif;font-size:17px;color:rgb(14, 18, 1);position:relative;display:inline-block;white-space:nowrap;user-select:none;vertical-align:top;margin-right:6px">Open in Maps</span>';
        }
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncNav);
  } else {
    syncNav();
  }
  setTimeout(syncNav, 400);
  setTimeout(syncNav, 1200);
})();
</script>
`;

  // Remove existing grand-nav-sync or grand-venue-replica-fix
  html = html.replace(/<script id="grand-venue-replica-fix">[\s\S]*?<\/script>/g, '');
  html = html.replace(/<script id="grand-nav-sync">[\s\S]*?<\/script>/g, '');
  html = html.replace('</body>', `${clientScript}</body>`);

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Updated ${path.basename(filePath)} (diff: ${html.length - originalLen} bytes)`);
}

updateFile(path.join(root, 'venues/venue-n1.html'));
updateFile(path.join(root, 'venues/open-earth-lawn.html'));
updateFile(path.join(root, 'venues/boutique-n1.html'));
