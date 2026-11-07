import fs from 'fs';

const p = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/boutique-n1.html';
let html = fs.readFileSync(p, 'utf8');

// Also decouple script_main from boutique-n1.html so it never crashes
html = html.replace(/<script[^>]*script_main[^>]*><\/script>/g, '');
html = html.replace(/<script type="framer\/handover"[^>]*>[\s\S]*?<\/script>/g, '');

const metaRedirect = '<meta http-equiv="refresh" content="0;url=/venues/venue-n1"><script>if(window.location.pathname!=="/venues/venue-n1"){window.location.replace("/venues/venue-n1");}</script>';
if (!html.includes('http-equiv="refresh"')) {
  html = html.replace('<head>', `<head>${metaRedirect}`);
}

fs.writeFileSync(p, html, 'utf8');
console.log('Updated boutique-n1.html with redirect fallback');
