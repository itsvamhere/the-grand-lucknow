import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const indexPath = path.join(root, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Let's refine updateLogoColorClass to properly detect body/html background and any light background under the logo
const scriptRegex = /<script id="grand-contrast-switcher-script">[\s\S]*?<\/script>/;

const newScript = `<script id="grand-contrast-switcher-script">
(function(){
  var lastIsLight = null;
  function updateLogoColorClass(){
    var isMobile = window.innerWidth <= 810;
    var x = isMobile ? 50 : 110;
    var y = isMobile ? 24 : 50;
    var isLight = false;

    // Check navbar wrapper background
    var navWrapper = document.querySelector('header, [data-framer-name="Navbar Wrapper"], [data-framer-name="Mobile Navbar"]');
    if (navWrapper) {
      var navBg = window.getComputedStyle(navWrapper).backgroundColor;
      var pNav = navBg ? navBg.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/) : null;
      if (pNav) {
        var navLum = 0.299 * (+pNav[1]) + 0.587 * (+pNav[2]) + 0.114 * (+pNav[3]);
        if (navLum > 140) isLight = true;
      }
    }

    // Check elements under logo
    if (!isLight) {
      var els = document.elementsFromPoint(x, y) || [];
      for(var i = 0; i < els.length; i++){
        var el = els[i];
        if(el.closest && el.closest('header, [data-framer-name="Navbar Wrapper"], [data-framer-name="Mobile Navbar"], [data-framer-name="Logo"]')) continue;
        if(el.matches && el.matches('[data-theme="light"], .light-section, [data-bg="light"]') || (el.closest && el.closest('[data-theme="light"], .light-section, [data-bg="light"]'))){
          isLight = true;
          break;
        }
        var bg = window.getComputedStyle(el).backgroundColor;
        if(bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent'){
          var p = bg.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)(?:,\\s*([\\d.]+))?/);
          if(p){
            if(p[4] !== undefined && parseFloat(p[4]) < 0.2) continue;
            var lum = 0.299 * (+p[1]) + 0.587 * (+p[2]) + 0.114 * (+p[3]);
            if(lum > 140){
              isLight = true;
              break;
            } else if(lum < 110){
              isLight = false;
              break;
            }
          }
        }
      }
    }

    // If still not determined, fallback to body / html background
    if (!isLight) {
      var bBg = window.getComputedStyle(document.body).backgroundColor;
      var hBg = window.getComputedStyle(document.documentElement).backgroundColor;
      var effBg = (bBg && bBg !== 'rgba(0, 0, 0, 0)' && bBg !== 'transparent') ? bBg : hBg;
      if (effBg) {
        var pb = effBg.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/);
        if (pb) {
          var bLum = 0.299 * (+pb[1]) + 0.587 * (+pb[2]) + 0.114 * (+pb[3]);
          if (bLum > 140) isLight = true;
        }
      }
    }

    if(isLight !== lastIsLight){
      lastIsLight = isLight;
      var root = document.documentElement;
      var logoEls = document.querySelectorAll('[data-framer-name="Logo"], #svg-1334768056_3843');
      if(isLight){
        root.setAttribute('data-logo-theme', 'dark');
        root.classList.add('logo-dark-text');
        root.classList.remove('logo-light-text');
        root.style.setProperty('--grand-logo-color', '#1A241E');
        logoEls.forEach(function(l){
          l.classList.add('logo-dark-text');
          l.classList.remove('logo-light-text');
          var p = l.querySelector('path');
          if (p) p.style.fill = '#1A241E';
        });
      } else {
        root.removeAttribute('data-logo-theme');
        root.classList.add('logo-light-text');
        root.classList.remove('logo-dark-text');
        root.style.setProperty('--grand-logo-color', '#FFF0CA');
        logoEls.forEach(function(l){
          l.classList.add('logo-light-text');
          l.classList.remove('logo-dark-text');
          var p = l.querySelector('path');
          if (p) p.style.fill = '#FFF0CA';
        });
      }
    }
  }

  window.addEventListener('scroll', updateLogoColorClass, { passive: true });
  window.addEventListener('resize', updateLogoColorClass, { passive: true });
  setInterval(updateLogoColorClass, 150); // Periodic check for dynamic Framer background changes
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', updateLogoColorClass);
  } else {
    updateLogoColorClass();
  }
})();
</script>`;

html = html.replace(scriptRegex, newScript);
fs.writeFileSync(indexPath, html, 'utf8');
console.log('Updated grand-contrast-switcher-script in index.html');
