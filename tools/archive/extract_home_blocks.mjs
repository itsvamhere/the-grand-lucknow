import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
const headerMatch = html.match(/<header[\s\S]*?<\/header>/i);
if (headerMatch) {
  fs.writeFileSync('tools/extracted_home_header.html', headerMatch[0]);
  console.log('Saved extracted header. Length:', headerMatch[0].length);
}

const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/i);
if (footerMatch) {
  fs.writeFileSync('tools/extracted_home_footer.html', footerMatch[0]);
  console.log('Saved extracted footer. Length:', footerMatch[0].length);
}
