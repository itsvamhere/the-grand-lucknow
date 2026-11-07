import fs from 'fs';

let html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html', 'utf8');

// 1. Ensure Google fonts link is in <head>
if (!html.includes('Playfair+Display')) {
  const fontLinks = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet">\n</head>`;
  html = html.replace('</head>', fontLinks);
}

// 2. Ensure svg-1334768056_3843 definition is present
const logoDef = `<svg viewBox="0 0 160 30" overflow="visible" id="svg-1334768056_3843">
  <text x="50%" y="22.5" text-anchor="middle" font-family="'DM Serif Display', 'Playfair Display', Didot, 'Bodoni MT', Georgia, serif" font-size="26" font-weight="900" letter-spacing="0.06em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">THE GRAND</text>
</svg>`;

if (!html.includes('id="svg-1334768056_3843"')) {
  // Inject right before the first <svg
  html = html.replace('<svg', `${logoDef}\n<svg`);
}

fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html', html, 'utf8');
fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/boutique-n2.html', html, 'utf8');
console.log('Injected serif logo symbol into venues/venue-n2.html');
