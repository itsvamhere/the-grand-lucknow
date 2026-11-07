import fs from 'fs';

const content = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
console.log('c1:', content.includes('font-family="\'Lay Grotesk Regular\'"'));
console.log('c2:', content.includes('%27Lay%20Grotesk%20Regular%27'));
console.log('c3:', content.includes('font-family=\\\'Lay Grotesk Regular\\\''));
console.log('c4:', content.includes('THE GRAND') && content.includes('<text'));

if (content.includes('%27Lay%20Grotesk%20Regular%27')) {
  let idx = content.indexOf('%27Lay%20Grotesk%20Regular%27');
  console.log('Found %27Lay%20Grotesk%20Regular%27 at index:', idx);
  console.log(content.slice(Math.max(0, idx - 100), Math.min(content.length, idx + 200)));
}
