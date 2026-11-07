import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

const pages = ['venues.html', 'about.html', 'contact.html', 'privacy.html', 'terms.html', 'imprint.html'];
pages.forEach(p => {
  const filePath = path.join(projectDir, p);
  if (fs.existsSync(filePath)) {
    const html = fs.readFileSync(filePath, 'utf8');
    // search for body style or background
    const m = html.match(/<body[^>]*style="[^"]*"|<body[^>]*class="[^"]*"/);
    const bgTokens = html.match(/--token-[a-f0-9-]+:\s*rgb\([^)]+\)/g) || [];
    console.log(`${p}: body match = ${m ? m[0] : 'default'}`);
  }
});
