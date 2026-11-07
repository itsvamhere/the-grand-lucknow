const fs = require('fs');

const lawnPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html';
const venueN1Path = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n1.html';

let html = fs.readFileSync(lawnPath, 'utf8');

// 1. Ensure Title is clean
html = html.replace(/<title>[\s\S]*?<\/title>/, '<title>Open Earth Lawn • The Grand Lucknow</title>');

// 2. Fix Navbar: Ensure opacity:1, transform:none, single arrow on button
// Replace opacity:0.001 and transform:translateY(10px) on nav containers
html = html.replace(/data-framer-appear-id="gaygr9"[^>]*style="[^"]*"/g, 'data-framer-appear-id="gaygr9" style="backdrop-filter:blur(8px);background-color:rgba(255, 240, 202, 0.07);-webkit-backdrop-filter:blur(8px);border-radius:2px;opacity:1;transform:none;"');
html = html.replace(/data-framer-appear-id="18mvsw1"[^>]*style="[^"]*"/g, 'data-framer-appear-id="18mvsw1" style="opacity:1;transform:none;"');

// 3. Fix the Open in Maps button in the navbar to have a SINGLE arrow and robust styling
const oldBtnRegex = /<a class="framer-vO7O2 framer-9t14z3 framer-v-wf9qrl framer-1swxj4p"[\s\S]*?<\/a>/g;
const cleanBtnHTML = `<a class="grand-nav-maps-btn" href="https://maps.app.goo.gl/94Dr1K1iPbZ3kR117" target="_blank" rel="noopener noreferrer">
  <span class="grand-nav-maps-text">Open in Maps</span>
  <svg class="grand-nav-maps-arrow" viewBox="0 0 10 10" width="10" height="10" aria-hidden="true">
    <path d="M 3 0 L 3 1 L 5.98 1 C 6.83 1 7.26 2.03 6.66 2.63 L 0 9.29 L 0.71 10 L 7.37 3.34 C 7.97 2.74 9 3.16 9 4.02 L 9 7 L 10 7 L 10 0 Z" fill="currentColor"/>
  </svg>
</a>`;

html = html.replace(oldBtnRegex, cleanBtnHTML);

// 4. Inject clean button CSS and router decoupling in <head>
const styleBlock = `
<style id="grand-bulletproof-btn-css">
.grand-nav-maps-btn, a.grand-nav-maps-btn {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  padding: 8px 16px !important;
  background-color: var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, #FFF0CA) !important;
  color: #0E1201 !important;
  text-decoration: none !important;
  border-radius: 2px !important;
  white-space: nowrap !important;
  width: auto !important;
  height: auto !important;
  opacity: 1 !important;
  visibility: visible !important;
  transition: opacity 0.2s ease, transform 0.2s ease !important;
  cursor: pointer !important;
  box-sizing: border-box !important;
}
.grand-nav-maps-btn:hover {
  opacity: 0.9 !important;
  transform: translateY(-1px) !important;
}
.grand-nav-maps-btn:visited, .grand-nav-maps-btn:active, .grand-nav-maps-btn:focus {
  color: #0E1201 !important;
}
.grand-nav-maps-text {
  font-family: 'Lay Grotesk Regular', sans-serif !important;
  font-size: 16px !important;
  font-weight: 500 !important;
  letter-spacing: 0.02em !important;
  color: #0E1201 !important;
  line-height: 1 !important;
  white-space: nowrap !important;
}
.grand-nav-maps-arrow {
  width: 9px !important;
  height: 9px !important;
  flex-shrink: 0 !important;
  color: #0E1201 !important;
}
/* Mobile & Desktop Header Visibility Enforcers */
header { opacity: 1 !important; visibility: visible !important; }
[data-framer-appear-id="gaygr9"], [data-framer-appear-id="18mvsw1"] { opacity: 1 !important; transform: none !important; }
</style>
`;

if (!html.includes('grand-bulletproof-btn-css')) {
  html = html.replace('</head>', styleBlock + '\n</head>');
}

// Write to both open-earth-lawn.html and venue-n1.html
fs.writeFileSync(lawnPath, html, 'utf8');
fs.writeFileSync(venueN1Path, html, 'utf8');
console.log('Successfully updated open-earth-lawn.html and venue-n1.html!');
