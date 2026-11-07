import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

const casaMomoPathD = `M 82.756 0.433 L 77.962 0.433 L 78.719 2.415 L 71.834 21.917 L 69.058 26.567 L 76.159 26.567 C 75.655 25.197 75.402 23.828 75.402 22.386 C 75.402 21.052 75.619 19.646 76.051 18.132 L 76.628 18.132 C 80.017 18.132 82.612 18.925 85.063 20.331 C 85.171 21.016 85.243 21.701 85.243 22.35 C 85.243 23.828 84.955 25.197 84.45 26.567 L 93.823 26.567 L 90.759 21.917 Z M 76.881 15.789 L 80.197 6.38 L 83.694 15.789 L 76.881 15.789 Z M 186.111 4.47 L 186.111 22.494 L 187.444 26.567 L 180.271 26.567 L 181.605 22.494 L 181.605 10.922 L 174.792 26.567 L 173.097 26.567 L 166.681 10.778 L 166.681 22.494 L 168.015 26.567 L 162.608 26.567 L 163.977 22.494 L 163.977 4.47 L 162.608 0.433 L 167.33 0.433 L 175.008 19.322 L 183.227 0.433 L 187.444 0.433 L 186.111 4.47 Z M 146.973 0 C 139.656 0 134.176 5.551 134.176 13.482 C 134.176 21.449 139.439 27 146.973 27 C 154.471 27 159.734 21.809 159.734 13.482 C 159.734 5.155 154.255 0 146.973 0 Z M 149.749 23.936 C 149.1 24.116 148.451 24.188 147.802 24.188 C 143.873 24.188 140.377 20.908 138.971 15.645 C 138.61 14.275 138.43 12.977 138.43 11.752 C 138.43 7.39 140.593 4.001 144.162 3.064 C 144.81 2.884 145.495 2.812 146.144 2.812 C 150.001 2.812 153.498 5.84 154.976 11.355 C 155.373 12.797 155.553 14.167 155.553 15.428 C 155.553 19.79 153.39 22.963 149.749 23.936 Z M 203.524 0 C 196.206 0 190.727 5.551 190.727 13.482 C 190.727 21.449 195.99 27 203.524 27 C 211.022 27 216.285 21.809 216.285 13.482 C 216.285 5.155 210.805 0 203.524 0 Z M 206.299 23.936 C 205.65 24.116 205.002 24.188 204.353 24.188 C 200.424 24.188 196.927 20.908 195.521 15.645 C 195.16 14.275 194.98 12.977 194.98 11.752 C 194.98 7.39 197.143 4.001 200.712 3.064 C 201.361 2.884 202.046 2.812 202.695 2.812 C 206.552 2.812 210.048 5.84 211.526 11.355 C 211.923 12.797 212.103 14.167 212.103 15.428 C 212.103 19.79 209.94 22.963 206.299 23.936 Z M 129.793 4.47 L 129.793 22.494 L 131.127 26.567 L 123.953 26.567 L 125.287 22.494 L 125.287 10.922 L 118.474 26.567 L 116.78 26.567 L 110.363 10.778 L 110.363 22.494 L 111.697 26.567 L 106.29 26.567 L 107.66 22.494 L 107.66 4.47 L 106.29 0.433 L 111.012 0.433 L 118.69 19.322 L 126.909 0.433 L 131.127 0.433 L 129.793 4.47 Z M 37.175 0.433 L 32.38 0.433 L 33.137 2.415 L 26.252 21.917 L 23.476 26.567 L 30.578 26.567 C 30.073 25.197 29.821 23.828 29.821 22.386 C 29.821 21.052 30.037 19.646 30.47 18.132 L 31.046 18.132 C 34.435 18.132 37.03 18.925 39.482 20.331 C 39.59 21.016 39.662 21.701 39.662 22.35 C 39.662 23.828 39.374 25.197 38.869 26.567 L 48.241 26.567 L 45.177 21.917 Z M 31.299 15.789 L 34.615 6.38 L 38.112 15.789 L 31.299 15.789 Z M 20.944 20.547 L 21.629 24.945 C 19.322 26.027 15.825 27 12.148 27 C 5.443 27 0 21.449 0 13.482 C 0 5.551 5.479 0.324 12.761 0 L 13.41 0 C 16.222 0 19.141 0.829 21.268 1.874 L 21.304 7.57 C 18.889 4.578 15.681 2.812 12.401 2.812 C 11.391 2.812 10.418 2.956 9.409 3.316 C 6.056 4.47 4.182 7.426 4.182 11.463 C 4.182 12.761 4.362 14.167 4.758 15.645 C 6.164 20.872 9.228 24.188 13.518 24.188 C 16.366 24.188 18.853 22.998 20.944 20.547 Z M 68.175 20.259 C 68.175 23.72 65.507 27 58.009 27 C 55.017 27 51.857 26.259 49.55 25.178 L 50.235 20.78 C 53.155 23.195 55.125 24.296 57.937 24.296 C 62.479 24.296 63.669 22.854 63.669 21.449 C 63.669 19.43 61.614 18.096 55.882 14.095 C 53.071 12.148 49.862 9.733 49.862 6.381 C 49.862 3.172 51.34 0 58.874 0 C 61.866 0 63.957 0.757 66.264 1.875 L 65.579 6.272 C 63.2 4.037 61.29 2.704 58.622 2.704 C 55.45 2.704 54.368 4.218 54.368 5.623 C 54.368 7.642 56.099 8.976 59.379 11.103 C 64.39 14.383 68.175 16.834 68.175 20.259 Z`;

// 1. Update images SVGs with exact Casa Momo vector path
const imagesDir = path.join(projectDir, 'images');

const wordmarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216.285 27" width="216.285" height="27">
  <path d="${casaMomoPathD}" fill="#FFF0CA"/>
</svg>
`;
fs.writeFileSync(path.join(imagesDir, 'wordmark.svg'), wordmarkSvg, 'utf8');

const logoLightSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216.285 27" width="216.285" height="27" fill="none">
  <path d="${casaMomoPathD}" fill="#FFF0CA"/>
</svg>
`;
fs.writeFileSync(path.join(imagesDir, 'logo-light.svg'), logoLightSvg, 'utf8');

const logoDarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216.285 27" width="216.285" height="27" fill="none">
  <path d="${casaMomoPathD}" fill="#1A241E"/>
</svg>
`;
fs.writeFileSync(path.join(imagesDir, 'logo-dark.svg'), logoDarkSvg, 'utf8');
console.log('1. Updated images/ SVGs with exact original CASA MOMO vector path.');

// 2. Update scripts/shared-lib.DganPNQZ.mjs
const sharedLibPath = path.join(projectDir, 'scripts', 'shared-lib.DganPNQZ.mjs');
let sharedLib = fs.readFileSync(sharedLibPath, 'utf8');

const newNavSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 216.285 27" overflow="visible"><path d="${casaMomoPathD}" fill="var(--grand-logo-color, var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(255, 240, 202)))"></path></svg>`;

const darkNavSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 216.285 27" overflow="visible"><path d="${casaMomoPathD}" fill="#1A241E"></path></svg>`;

const defaultTarget = /layoutId:`ufowuZXjc`,requiresOverflowVisible:!1,svg:`<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"[^>]*>[\s\S]*?<\/svg>`/;
sharedLib = sharedLib.replace(defaultTarget, `layoutId:\`ufowuZXjc\`,requiresOverflowVisible:!1,svg:\`${newNavSvg}\``);

const variantTarget = /aMxe_5mGw:\{svg:`<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"[^>]*>[\s\S]*?<\/svg>`\},jhdzIHOco:\{svg:`<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"[^>]*>[\s\S]*?<\/svg>`\}/;
sharedLib = sharedLib.replace(variantTarget, `aMxe_5mGw:{svg:\`${darkNavSvg}\`},jhdzIHOco:{svg:\`${darkNavSvg}\`}`);

fs.writeFileSync(sharedLibPath, sharedLib, 'utf8');
console.log('2. Updated scripts/shared-lib.DganPNQZ.mjs with exact CASA MOMO path.');

// 3. Update CSS & Contrast Switcher
const contrastSwitcherSnippet = `
<style id="grand-contrast-switcher-style">
:root {
  --grand-logo-color: #FFF0CA;
}
.logo-dark-text [data-framer-name="Logo"] path,
.logo-dark-text #svg-1334768056_3843 path,
[data-framer-name="Logo"].logo-dark-text path,
[data-logo-theme="dark"] [data-framer-name="Logo"] path,
[data-logo-theme="dark"] #svg-1334768056_3843 path,
[data-framer-name="Dark"] [data-framer-name="Logo"] path,
[data-framer-name="Phone Dark"] [data-framer-name="Logo"] path,
.framer-v-1yl90lf [data-framer-name="Logo"] path,
.framer-v-385mce [data-framer-name="Logo"] path,
.framer-v-1qojn0s [data-framer-name="Logo"] path {
  fill: #1A241E !important;
  transition: fill 0.2s ease-in-out;
}

.logo-light-text [data-framer-name="Logo"] path,
.logo-light-text #svg-1334768056_3843 path,
[data-framer-name="Logo"].logo-light-text path {
  fill: #FFF0CA !important;
  transition: fill 0.2s ease-in-out;
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

    var navWrapper = document.querySelector('header, [data-framer-name="Navbar Wrapper"], [data-framer-name="Mobile Navbar"]');
    if (navWrapper) {
      var navBg = window.getComputedStyle(navWrapper).backgroundColor;
      var pNav = navBg ? navBg.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/) : null;
      if (pNav) {
        var navLum = 0.299 * (+pNav[1]) + 0.587 * (+pNav[2]) + 0.114 * (+pNav[3]);
        if (navLum > 140) isLight = true;
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
  <path d="${casaMomoPathD}" fill="var(--grand-logo-color, var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(255, 240, 202)))"></path>
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
console.log('3. All HTML files updated with original CASA MOMO vector path!');
