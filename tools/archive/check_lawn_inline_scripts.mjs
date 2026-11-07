import fs from 'fs';

const content = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let i = 0;
while ((match = scriptRegex.exec(content)) !== null) {
  const scriptContent = match[1];
  if (scriptContent.includes('Lay Grotesk') || scriptContent.includes('THE GRAND') || scriptContent.includes('framer-xj8hz2') || scriptContent.includes('background-image')) {
    console.log(`Script ${i} matches! Length: ${scriptContent.length}`);
    console.log(scriptContent.slice(0, 300));
  }
  i++;
}
console.log(`Total inline scripts in open-earth-lawn: ${i}`);
