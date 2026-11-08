import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Look for collision guard
const guardIdx = subHtml.indexOf('grand-nav-footer-collision-guard');
if (guardIdx !== -1) {
  console.log('--- grand-nav-footer-collision-guard ---');
  console.log(subHtml.substring(guardIdx - 30, guardIdx + 800));
}

// Look for any JavaScript that modifies header or navbar
const scripts = subHtml.match(/<script[\s\S]*?<\/script>/gi) || [];
scripts.forEach((s, idx) => {
  if (s.includes('Navbar Wrapper') || s.includes('header') || s.includes('framer-1i47qog') || s.includes('framer-bg7hsc')) {
    console.log(`Script ${idx} modifies navbar:`);
    console.log(s.slice(0, 500) + '...\n');
  }
});
