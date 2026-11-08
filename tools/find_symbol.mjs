import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');

const idIdx = homeHtml.indexOf('svg870196829_4253');
if (idIdx !== -1) {
  console.log('Found svg870196829_4253 at', idIdx);
  console.log(homeHtml.substring(idIdx - 100, idIdx + 600));
} else {
  console.log('Not found');
}
