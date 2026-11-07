import fs from 'fs';
const html = fs.readFileSync('upstream_boutique_n2.html', 'utf8');
console.log('length:', html.length);

// Extract title, description, h1, h2
const title = (html.match(/<title>([^<]+)<\/title>/) || [])[1];
console.log('Title:', title);

// search for headings or sections
const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('H1s:', h1s);

const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('H2s:', h2s);

// search for booking/calendar
const bookingMatches = [...html.matchAll(/data-framer-name="([^"]*Booking[^"]*|[^"]*Calendar[^"]*|[^"]*Availability[^"]*)"/gi)].map(m => m[1]);
console.log('Booking components in HTML:', bookingMatches);
