const fs = require('fs');

const desktopSvgText = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 2404.809 300.206" overflow="visible"><text x="50%" y="225" text-anchor="middle" font-family="'Lay Grotesk Regular', sans-serif" font-size="192" font-weight="700" letter-spacing="0.08em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">THE GRAND</text></svg>`;

const desktopSvgVector = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/tools/the_grand_footer_desktop.svg', 'utf8');

console.log('Text SVG length:', desktopSvgText.length);
console.log('Vector SVG length:', desktopSvgVector.length);

console.log('Text SVG snippet:', desktopSvgText);
console.log('Vector SVG snippet:', desktopSvgVector.substring(0, 200));
