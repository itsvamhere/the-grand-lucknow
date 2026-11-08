import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

function showContext(str, name) {
  const idx = subHtml.indexOf(str);
  if (idx !== -1) {
    console.log(`=== Found ${name} ===`);
    console.log(subHtml.substring(idx - 100, idx + 500));
  } else {
    console.log(`=== ${name} NOT found ===`);
  }
}

showContext('grand-footer-nav-observer', 'grand-footer-nav-observer');
showContext('grand-nav-footer-collision-guard', 'grand-nav-footer-collision-guard');
showContext('nav-hidden-over-footer', 'nav-hidden-over-footer');
