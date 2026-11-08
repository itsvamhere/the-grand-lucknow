import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');

const defIdx = homeHtml.indexOf('id="svg870196829_4253"');
if (defIdx !== -1) {
  console.log('Found definition at', defIdx);
  console.log(homeHtml.substring(defIdx - 50, defIdx + 1000));
} else {
  console.log('Not found id="svg870196829_4253"');
}
