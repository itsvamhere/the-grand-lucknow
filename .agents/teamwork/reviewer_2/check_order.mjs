import fs from 'fs';
const s = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');
const idxNav = s.indexOf('id="grand-navbar-engine-css"');
const idxBtn = s.indexOf('id="grand-nav-btn-fix"');
console.log('grand-nav-btn-fix position:', idxBtn);
console.log('grand-navbar-engine-css position:', idxNav);
