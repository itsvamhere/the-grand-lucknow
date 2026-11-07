import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

const headerMatch = html.match(/<header[\s\S]*?<\/header>/i);
if (headerMatch) {
  console.log('=== HEADER FOUND ===');
  console.log('Length:', headerMatch[0].length);
  console.log('First 200 chars:', headerMatch[0].slice(0, 200));
  console.log('Last 200 chars:', headerMatch[0].slice(-200));
} else {
  console.log('No <header> tag found.');
}

const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/i);
if (footerMatch) {
  console.log('=== FOOTER FOUND ===');
  console.log('Length:', footerMatch[0].length);
  console.log('First 200 chars:', footerMatch[0].slice(0, 200));
  console.log('Last 200 chars:', footerMatch[0].slice(-200));
} else {
  console.log('No <footer> tag found.');
}
