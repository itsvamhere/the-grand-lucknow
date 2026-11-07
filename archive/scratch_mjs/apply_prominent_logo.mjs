import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

// Read font as base64
const fontBuf = fs.readFileSync(path.join(projectDir, 'fonts', 'el_pacre_regular.woff2'));
const fontBase64 = fontBuf.toString('base64');

// 1. Update images SVGs with font-size 27, stroke-width 0.75, letter-spacing 0.14em
const imagesDir = path.join(projectDir, 'images');

const wordmarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216.285 27" width="216.285" height="27">
  <defs>
    <style>
      @font-face {
        font-family: 'EL PACRE Regular';
        src: url('data:font/woff2;base64,${fontBase64}') format('woff2');
        font-weight: 400;
        font-style: normal;
      }
    </style>
  </defs>
  <text x="50%" y="22.5" text-anchor="middle" font-family="'EL PACRE Regular', 'EL PACRE Regular Placeholder', serif" font-size="27" font-weight="700" stroke="#FFF0CA" stroke-width="0.75" paint-order="stroke fill" letter-spacing="0.14em" fill="#FFF0CA">THE GRAND</text>
</svg>
`;
fs.writeFileSync(path.join(imagesDir, 'wordmark.svg'), wordmarkSvg, 'utf8');

const logoLightSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216.285 27" width="216.285" height="27" fill="none">
  <defs>
    <style>
      @font-face {
        font-family: 'EL PACRE Regular';
        src: url('data:font/woff2;base64,${fontBase64}') format('woff2');
        font-weight: 400;
        font-style: normal;
      }
    </style>
  </defs>
  <text x="50%" y="22.5" text-anchor="middle" font-family="'EL PACRE Regular', 'EL PACRE Regular Placeholder', serif" font-size="27" font-weight="700" stroke="#FFF0CA" stroke-width="0.75" paint-order="stroke fill" letter-spacing="0.14em" fill="#FFF0CA">THE GRAND</text>
</svg>
`;
fs.writeFileSync(path.join(imagesDir, 'logo-light.svg'), logoLightSvg, 'utf8');

const logoDarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216.285 27" width="216.285" height="27" fill="none">
  <defs>
    <style>
      @font-face {
        font-family: 'EL PACRE Regular';
        src: url('data:font/woff2;base64,${fontBase64}') format('woff2');
        font-weight: 400;
        font-style: normal;
      }
    </style>
  </defs>
  <text x="50%" y="22.5" text-anchor="middle" font-family="'EL PACRE Regular', 'EL PACRE Regular Placeholder', serif" font-size="27" font-weight="700" stroke="#1A241E" stroke-width="0.75" paint-order="stroke fill" letter-spacing="0.14em" fill="#1A241E">THE GRAND</text>
</svg>
`;
fs.writeFileSync(path.join(imagesDir, 'logo-dark.svg'), logoDarkSvg, 'utf8');
console.log('1. Updated images/ SVGs with bold stroked prominent typography (size 27, stroke 0.75, tracking 0.14em).');

// 2. Update scripts/shared-lib.DganPNQZ.mjs
const sharedLibPath = path.join(projectDir, 'scripts', 'shared-lib.DganPNQZ.mjs');
let sharedLib = fs.readFileSync(sharedLibPath, 'utf8');

const newNavSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 216.285 27" overflow="visible"><text x="50%" y="22.5" text-anchor="middle" font-family="'EL PACRE Regular', 'EL PACRE Regular Placeholder', serif" font-size="27" font-weight="700" stroke="var(--grand-logo-color, var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221)))" stroke-width="0.75" paint-order="stroke fill" letter-spacing="0.14em" fill="var(--grand-logo-color, var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221)))">THE GRAND</text></svg>`;

const darkNavSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 216.285 27" overflow="visible"><text x="50%" y="22.5" text-anchor="middle" font-family="'EL PACRE Regular', 'EL PACRE Regular Placeholder', serif" font-size="27" font-weight="700" stroke="#1A241E" stroke-width="0.75" paint-order="stroke fill" letter-spacing="0.14em" fill="#1A241E">THE GRAND</text></svg>`;

// Replace default nav SVG in ufowuZXjc
const defaultTarget = /layoutId:`ufowuZXjc`,requiresOverflowVisible:!1,svg:`<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"[^>]*>[\s\S]*?<\/svg>`/;
sharedLib = sharedLib.replace(defaultTarget, `layoutId:\`ufowuZXjc\`,requiresOverflowVisible:!1,svg:\`${newNavSvg}\``);

// Replace variant target
const variantTarget = /aMxe_5mGw:\{svg:`<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"[^>]*>[\s\S]*?<\/svg>`\},jhdzIHOco:\{svg:`<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"[^>]*>[\s\S]*?<\/svg>`\}/;
sharedLib = sharedLib.replace(variantTarget, `aMxe_5mGw:{svg:\`${darkNavSvg}\`},jhdzIHOco:{svg:\`${darkNavSvg}\`}`);

fs.writeFileSync(sharedLibPath, sharedLib, 'utf8');
console.log('2. Updated scripts/shared-lib.DganPNQZ.mjs');

// 3. Update CSS & Dynamic Contrast Switcher in all HTML files
const contrastSwitcherSnippet = `
<style id="grand-contrast-switcher-style">
:root {
  --grand-logo-color: #FFF0CA;
}
.logo-dark-text [data-framer-name="Logo"] text,
.logo-dark-text #svg-1334768056_3843 text,
[data-framer-name="Logo"].logo-dark-text text,
[data-logo-theme="dark"] [data-framer-name="Logo"] text,
[data-logo-theme="dark"] #svg-1334768056_3843 text,
[data-framer-name="Dark"] [data-framer-name="Logo"] text,
[data-framer-name="Phone Dark"] [data-framer-name="Logo"] text,
.framer-v-1yl90lf [data-framer-name="Logo"] text,
.framer-v-385mce [data-framer-name="Logo"] text,
.framer-v-1qojn0s [data-framer-name="Logo"] text {
  fill: #1A241E !important;
  stroke: #1A241E !important;
  transition: fill 0.2s ease-in-out, stroke 0.2s ease-in-out;
}

.logo-dark-text [data-framer-name="Logo"] img,
[data-logo-theme="dark"] [data-framer-name="Logo"] img,
[data-framer-name="Dark"] [data-framer-name="Logo"] img,
[data-framer-name="Phone Dark"] [data-framer-name="Logo"] img,
.framer-v-1yl90lf [data-framer-name="Logo"] img,
.framer-v-385mce [data-framer-name="Logo"] img,
.framer-v-1qojn0s [data-framer-name="Logo"] img {
  filter: brightness(0) saturate(100%) invert(11%) sepia(10%) saturate(1450%) hue-rotate(95deg) brightness(94%) contrast(92%) !important;
  transition: filter 0.2s ease-in-out;
}

.logo-light-text [data-framer-name="Logo"] text,
.logo-light-text #svg-1334768056_3843 text,
[data-framer-name="Logo"].logo-light-text text {
  fill: #FFF0CA !important;
  stroke: #FFF0CA !important;
  transition: fill 0.2s ease-in-out, stroke 0.2s ease-in-out;
}

.logo-light-text [data-framer-name="Logo"] img {
  filter: none !important;
  transition: filter 0.2s ease-in-out;
}
</style>
<script id="grand-contrast-switcher-script">
(function(){
  var lastIsLight = null;
  function updateLogoColorClass(){
    var isMobile = window.innerWidth <= 810;
    var x = isMobile ? 50 : 110;
    var y = isMobile ? 24 : 50;
    var isLight = false;

    // Check navbar panel backgroundColor
    var navWrapper = document.querySelector('header, [data-framer-name="Navbar Wrapper"], [data-framer-name="Mobile Navbar"]');
    if (navWrapper) {
      var navBg = window.getComputedStyle(navWrapper).backgroundColor;
      var pNav = navBg ? navBg.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/) : null;
      if (pNav) {
        var navLum = 0.299 * (+pNav[1]) + 0.587 * (+pNav[2]) + 0.114 * (+pNav[3]);
        if (navLum > 140) {
          isLight = true;
        }
      }
    }

    if (!isLight) {
      var els = document.elementsFromPoint(x, y) || [];
      for(var i = 0; i < els.length; i++){
        var el = els[i];
        if(el.closest && el.closest('header, [data-framer-name="Navbar Wrapper"], [data-framer-name="Mobile Navbar"]')) continue;
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

    if(isLight !== lastIsLight){
      lastIsLight = isLight;
      var root = document.documentElement;
      var logoEls = document.querySelectorAll('[data-framer-name="Logo"]');
      if(isLight){
        root.setAttribute('data-logo-theme', 'dark');
        root.classList.add('logo-dark-text');
        root.classList.remove('logo-light-text');
        root.style.setProperty('--grand-logo-color', '#1A241E');
        logoEls.forEach(function(l){ l.classList.add('logo-dark-text'); l.classList.remove('logo-light-text'); });
      } else {
        root.removeAttribute('data-logo-theme');
        root.classList.add('logo-light-text');
        root.classList.remove('logo-dark-text');
        root.style.setProperty('--grand-logo-color', '#FFF0CA');
        logoEls.forEach(function(l){ l.classList.add('logo-light-text'); l.classList.remove('logo-dark-text'); });
      }
    }
  }

  window.addEventListener('scroll', updateLogoColorClass, { passive: true });
  window.addEventListener('resize', updateLogoColorClass, { passive: true });
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', updateLogoColorClass);
  } else {
    updateLogoColorClass();
  }
})();
</script>
`;

const newHtmlNavSvg = `<svg viewBox="0 0 216.285 27" overflow="visible" id="svg-1334768056_3843">
  <text x="50%" y="22.5" text-anchor="middle" font-family="'EL PACRE Regular', 'EL PACRE Regular Placeholder', serif" font-size="27" font-weight="700" stroke="var(--grand-logo-color, var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221)))" stroke-width="0.75" paint-order="stroke fill" letter-spacing="0.14em" fill="var(--grand-logo-color, var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221)))">THE GRAND</text>
</svg>`;

function updateHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (content.includes('id="svg-1334768056_3843"')) {
    content = content.replace(
      /<svg[^>]*id="svg-1334768056_3843"[^>]*>[\s\S]*?<\/svg>/,
      newHtmlNavSvg
    );
    changed = true;
  }

  if (content.includes('id="grand-contrast-switcher-style"')) {
    content = content.replace(/<style id="grand-contrast-switcher-style">[\s\S]*?<\/script>/, contrastSwitcherSnippet.trim());
    changed = true;
  } else if (content.includes('</head>')) {
    content = content.replace('</head>', `${contrastSwitcherSnippet.trim()}\n</head>`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated HTML: ${path.relative(projectDir, filePath)}`);
  }
}

function walkDir(dir) {
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (item !== 'node_modules' && item !== '.git' && item !== '.vercel') {
        walkDir(full);
      }
    } else if (item.endsWith('.html')) {
      updateHtmlFile(full);
    }
  }
}

walkDir(projectDir);
console.log('Applied bold, grand, prominent reference logo typography matching Casa Momo!');
