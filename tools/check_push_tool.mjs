import fs from 'fs';

const files = fs.readdirSync('tools');
const pushScripts = files.filter(f => f.includes('push') || f.includes('git'));
console.log('Push/Git scripts in tools:', pushScripts);
if (fs.existsSync('tools/push_to_github.mjs')) {
  console.log('push_to_github.mjs exists!');
}
