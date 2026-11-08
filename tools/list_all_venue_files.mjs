import fs from 'fs';

const files = fs.readdirSync('venues').filter(f => f.endsWith('.html'));
files.forEach(f => {
  const content = fs.readFileSync('venues/' + f, 'utf8');
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  console.log(`\nFile: ${f} (${content.length} bytes)`);
  console.log('Title:', titleMatch ? titleMatch[1] : 'none');
  console.log('H1:', h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'none');
});
