import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');

const regex = /<symbol[^>]*viewBox="[^"]*2404\.809[^"]*"[^>]*>/gi;
let match;
while ((match = regex.exec(homeHtml)) !== null) {
  console.log('Found symbol for 2404.809:');
  console.log(match[0]);
  const endSym = homeHtml.indexOf('</symbol>', match.index);
  console.log('Symbol full content (first 500 chars):');
  console.log(homeHtml.substring(match.index, match.index + 500));
}
