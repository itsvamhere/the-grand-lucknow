import fs from 'fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/boutique-n1.html', 'utf8');
const noFramer = html
  .replace(/<script[^>]*script_main[^>]*><\/script>/g, '')
  .replace(/<script type="framer\/handover"[^>]*>[\s\S]*?<\/script>/g, '');

fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/test_noframer.html', noFramer, 'utf8');
console.log('Saved test_noframer.html');
