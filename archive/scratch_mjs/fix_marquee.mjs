import fs from 'fs';

let content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/shared-lib.DganPNQZ.mjs', 'utf8');

// Replace the double text SVG with a single centered SVG
const oldSvgPattern = /<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"[^>]*viewBox="0 0 2404\.809 300\.206"[^>]*>[\s\S]*?<\/svg>/g;

const cleanSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 2404.809 300.206" overflow="visible"><text x="50%" y="235" text-anchor="middle" font-family="'Lay Grotesk Regular', sans-serif" font-size="220" font-weight="700" letter-spacing="0.08em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">THE GRAND</text></svg>`;

content = content.replace(oldSvgPattern, cleanSvg);

fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/shared-lib.DganPNQZ.mjs', content, 'utf8');
console.log('Fixed footer marquee in shared-lib.DganPNQZ.mjs');
