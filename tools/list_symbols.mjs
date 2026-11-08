import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');

const regex = /<symbol[^>]*id="([^"]+)"[^>]*>/gi;
let match;
while ((match = regex.exec(homeHtml)) !== null) {
  console.log('Symbol id:', match[1], 'Tag:', match[0].slice(0, 100));
}
