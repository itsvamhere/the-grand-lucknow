import fs from 'fs';

const p = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n1.html';
let html = fs.readFileSync(p, 'utf8');

// Decouple external Framer runtime that resets to 404 when route is not boutique-n1
html = html.replace(/<script[^>]*script_main[^>]*><\/script>/g, '');
html = html.replace(/<script type="framer\/handover"[^>]*>[\s\S]*?<\/script>/g, '');

fs.writeFileSync(p, html, 'utf8');
console.log('Decoupled framer runtime from venue-n1.html');
