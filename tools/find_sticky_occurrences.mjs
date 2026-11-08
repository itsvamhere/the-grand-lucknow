import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const regex = /stickyBtn/g;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log('stickyBtn occurrence:\n', html.slice(m.index - 30, m.index + 150));
}
