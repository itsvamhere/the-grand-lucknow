import fs from 'fs';

const html = fs.readFileSync('tools/sample_booking_item.html', 'utf8');

// Find all data-framer-name inside
const names = html.match(/data-framer-name="[^"]+"/g) || [];
console.log('Framer names:', Array.from(new Set(names)));

// Find all text inside
console.log('Text content:');
const cleanText = html.replace(/<style[^>]*>.*?<\/style>/gs, '')
                      .replace(/<script[^>]*>.*?<\/script>/gs, '')
                      .replace(/<[^>]+>/g, ' ')
                      .replace(/\s+/g, ' ')
                      .trim();
console.log(cleanText.slice(0, 500));
