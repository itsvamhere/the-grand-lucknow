import fs from 'fs';

const htmlPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace the H1 spans so only "Open Earth Lawn" shows cleanly
const oldH1Span = `<!-- --> <span style="display:inline-flex;overflow:hidden;padding-top:0;margin-top:0;padding-left:0.06em;padding-right:0.06em;margin-left:-0.06em;margin-right:-0.06em;padding-bottom:4px;margin-bottom:-4px"><span style="display:inline-block;transform-origin:50% 100%;will-change:transform;opacity:1;transform:translateY(400px) rotate(8deg)">N°1</span></span> <span style="position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap"> – Premier Event Venue in Lucknow</span>`;
const newH1Span = `<span style="position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap"> – Premier Luxury Event Estate in Lucknow</span>`;

html = html.replaceAll(oldH1Span, newH1Span);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Cleaned H1 in open-earth-lawn.html!');
