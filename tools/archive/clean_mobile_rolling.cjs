const fs = require('fs');

const p = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n1.html';
let html = fs.readFileSync(p, 'utf8');

// Replace any remaining rolling label spans in mobile menu
const rollingRegex = /<span data-rolling-label[^>]*>[\s\S]*?<\/span><!--\/\$-->/g;
html = html.replace(rollingRegex, (match) => {
  if (match.includes('Venues') || match.includes('Apartment')) {
    return `<span style="font-family:'Lay Grotesk Regular', sans-serif;font-size:24px;color:rgb(255, 240, 202);position:relative;display:inline-block;white-space:nowrap;user-select:none;vertical-align:top">Venues</span><!--/$-->`;
  }
  if (match.includes('About')) {
    return `<span style="font-family:'Lay Grotesk Regular', sans-serif;font-size:24px;color:rgb(255, 240, 202);position:relative;display:inline-block;white-space:nowrap;user-select:none;vertical-align:top">About</span><!--/$-->`;
  }
  if (match.includes('Contact')) {
    return `<span style="font-family:'Lay Grotesk Regular', sans-serif;font-size:24px;color:rgb(255, 240, 202);position:relative;display:inline-block;white-space:nowrap;user-select:none;vertical-align:top">Contact</span><!--/$-->`;
  }
  if (match.includes('Open in Maps') || match.includes('Book') || match.includes('Inquire')) {
    return `<span style="font-family:'Lay Grotesk Regular', sans-serif;font-size:17px;color:rgb(14, 18, 1);position:relative;display:inline-block;white-space:nowrap;user-select:none;vertical-align:top;margin-right:6px">Open in Maps</span><!--/$-->`;
  }
  return match;
});

fs.writeFileSync(p, html, 'utf8');
console.log('Cleaned mobile rolling labels');
