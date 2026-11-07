import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

// Read font as base64
const fontBuf = fs.readFileSync(path.join(projectDir, 'fonts', 'el_pacre_regular.woff2'));
const fontBase64 = fontBuf.toString('base64');

// --- 1. Update logo-dark.svg in images/ to pure black #000000 ---
const imagesDir = path.join(projectDir, 'images');

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
  <text x="50%" y="22" text-anchor="middle" font-family="'EL PACRE Regular', 'EL PACRE Regular Placeholder', serif" font-size="25" font-weight="600" letter-spacing="0.075em" fill="#000000">THE GRAND</text>
</svg>
`;
fs.writeFileSync(path.join(imagesDir, 'logo-dark.svg'), logoDarkSvg, 'utf8');
console.log('1. Updated images/logo-dark.svg with pure black fill (#000000).');

// --- 2. Update scripts/shared-lib.DganPNQZ.mjs ---
const sharedLibPath = path.join(projectDir, 'scripts', 'shared-lib.DganPNQZ.mjs');
let sharedLib = fs.readFileSync(sharedLibPath, 'utf8');

// For aMxe_5mGw (Dark) and jhdzIHOco (Phone Dark), set fill to #000000
const darkSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 216.285 27" overflow="visible"><text x="50%" y="22" text-anchor="middle" font-family="'EL PACRE Regular', 'EL PACRE Regular Placeholder', serif" font-size="25" font-weight="600" letter-spacing="0.075em" fill="#000000">THE GRAND</text></svg>`;

const lightSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 216.285 27" overflow="visible"><text x="50%" y="22" text-anchor="middle" font-family="'EL PACRE Regular', 'EL PACRE Regular Placeholder', serif" font-size="25" font-weight="600" letter-spacing="0.075em" fill="var(--grand-logo-color, var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221)))">THE GRAND</text></svg>`;

// Replace in ufowuZXjc
const targetBlock = /aMxe_5mGw:\{svg:`<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"[^>]*>[\s\S]*?<\/svg>`\},jhdzIHOco:\{svg:`<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"[^>]*>[\s\S]*?<\/svg>`\}/;
const replacementBlock = `aMxe_5mGw:{svg:\`${darkSvg}\`},jhdzIHOco:{svg:\`${darkSvg}\`}`;

if (targetBlock.test(sharedLib)) {
  sharedLib = sharedLib.replace(targetBlock, replacementBlock);
  console.log('2. Replaced aMxe_5mGw and jhdzIHOco variants in shared-lib with pure black SVG.');
} else {
  console.log('Target block not matched directly, looking for alternative replace');
}

fs.writeFileSync(sharedLibPath, sharedLib, 'utf8');

// --- 3. Update CSS & Dynamic Contrast Switcher Snippet in all HTML files ---
const contrastSwitcherSnippet = `
<style id="grand-contrast-switcher-style">
:root {
  --grand-logo-color: #FFF0CA;
}
[data-logo-theme="dark"] {
  --grand-logo-color: #000000 !important;
}
/* When sticky logo is in dark mode or on light background, it becomes purely black */
[data-logo-theme="dark"] [data-framer-name="Logo"] text,
[data-logo-theme="dark"] #svg-1334768056_3843 text,
[data-framer-name="Dark"] [data-framer-name="Logo"] text,
[data-framer-name="Phone Dark"] [data-framer-name="Logo"] text,
.framer-v-1yl90lf [data-framer-name="Logo"] text,
.framer-v-385mce [data-framer-name="Logo"] text,
.framer-v-1qojn0s [data-framer-name="Logo"] text {
  fill: #000000 !important;
  transition: fill 0.2s ease-in-out;
}
[data-logo-theme="dark"] [data-framer-name="Logo"] img,
[data-framer-name="Dark"] [data-framer-name="Logo"] img,
[data-framer-name="Phone Dark"] [data-framer-name="Logo"] img,
.framer-v-1yl90lf [data-framer-name="Logo"] img,
.framer-v-385mce [data-framer-name="Logo"] img,
.framer-v-1qojn0s [data-framer-name="Logo"] img {
  filter: brightness(0) !important;
  transition: filter 0.2s ease-in-out;
}
</style>
<script id="grand-contrast-switcher-script">
(function(){
  var lastState = null;
  function updateContrast(){
    var isMobile = window.innerWidth <= 810;
    var x = isMobile ? 50 : 110;
    var y = isMobile ? 24 : 50;
    var isLight = false;

    // Check if the sticky navbar panel itself is in dark/light mode
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
          var p = bg.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/);
          if(p){
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

    if(isLight !== lastState){
      lastState = isLight;
      if(isLight){
        document.documentElement.setAttribute('data-logo-theme', 'dark');
        document.documentElement.style.setProperty('--grand-logo-color', '#000000');
      } else {
        document.documentElement.removeAttribute('data-logo-theme');
        document.documentElement.style.setProperty('--grand-logo-color', '#FFF0CA');
      }
    }
  }
  window.addEventListener('scroll', updateContrast, { passive: true });
  window.addEventListener('resize', updateContrast, { passive: true });
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', updateContrast);
  } else {
    updateContrast();
  }
})();
</script>
`;

function updateHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace snippet
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
console.log('Applied pure black (#000000) logo fix across all files!');
