import fs from 'fs';

const files = fs.readdirSync('tools').filter(f => f.endsWith('.mjs'));
for (const f of files) {
  const content = fs.readFileSync('tools/' + f, 'utf8');
  const m = content.match(/https?:\/\/[^\s'"\`]+casamomo[^\s'"\`]*/gi) || content.match(/https?:\/\/[^\s'"\`]+momo[^\s'"\`]*/gi);
  if (m) console.log(f, m);
}
