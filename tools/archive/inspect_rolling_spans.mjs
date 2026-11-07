import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const footer = fs.readFileSync(path.join(ROOT, 'tools', 'canonical_footer.html'), 'utf8');

// Find the Apartments/Venues link
const vMatch = footer.match(/<a[^>]*href="\/venues"[^>]*>[\s\S]*?<\/a>/i);
if (vMatch) {
  console.log('=== VENUES LINK HTML ===');
  console.log(vMatch[0]);
}

// Find the Facebook/LinkedIn link
const fMatch = footer.match(/<a[^>]*href="https:\/\/www\.facebook\.com\/[^"]*"[^>]*>[\s\S]*?<\/a>/i);
if (fMatch) {
  console.log('=== FACEBOOK LINK HTML ===');
  console.log(fMatch[0]);
}
