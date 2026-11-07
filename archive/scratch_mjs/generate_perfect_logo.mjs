import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

// Generate logo-dark.svg and logo-light.svg
// The original viewBox was: 0 0 216.285 27
// CASA MOMO had 8 characters plus space = 9 chars
// THE GRAND has 8 characters plus space = 9 chars!
// It matches character count identically!

function makeLogoSvg(color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216.285 27" width="216.285" height="27" fill="none">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&amp;family=Playfair+Display:wght@700;900&amp;display=swap');
      .brand-title {
        font-family: 'DM Serif Display', 'Playfair Display', Didot, 'Bodoni MT', 'Cinzel', Georgia, serif;
        font-size: 25.5px;
        font-weight: 900;
        letter-spacing: 0.055em;
        text-transform: uppercase;
      }
    </style>
  </defs>
  <text x="0" y="22" class="brand-title" fill="${color}">THE GRAND</text>
</svg>`;
}

fs.writeFileSync(path.join(projectDir, 'images/logo-dark.svg'), makeLogoSvg('#0E1201'), 'utf-8');
fs.writeFileSync(path.join(projectDir, 'images/logo-light.svg'), makeLogoSvg('#FFF0CA'), 'utf-8');

console.log('✓ Updated images/logo-dark.svg and images/logo-light.svg with bold editorial serif typography matching CASA MOMO');
