import fs from 'fs';
import path from 'path';

const root = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const theGrandD = fs.readFileSync(path.join(root, 'tools/the_grand_matched_d.txt'), 'utf8').trim();
const MAPS_LINK = 'https://maps.app.goo.gl/94Dr1K1iPbZ3kR117';

function cleanNav(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Replace the entire Link 0 (Venues) inside nav
  const link0Regex = /<a class="framer-s5137h[^"]*"[^>]*href="[^"]*"[\s\S]*?<\/a>/gi;
  const newLink0 = `<a class="framer-s5137h framer-fja3wr" data-framer-name="Nav Link" href="/#venues"><div class="framer-qv358a-container"><div class="framer-ypCW0 framer-zl1g6k framer-v-zl1g6k" data-framer-name="Medium"><div class="framer-w9fus0-container" data-code-component-plugin-id="api"><span style="font-family:'Lay Grotesk Regular', 'Lay Grotesk Regular Placeholder', sans-serif;font-size:17px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.2em;color:var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(255, 240, 202));position:relative;display:inline-block;white-space:nowrap;user-select:none;vertical-align:top">Venues</span></div></div></div></a>`;
  html = html.replace(link0Regex, newLink0);

  // 2. Replace Link 1 (About) inside nav
  const link1Regex = /<a class="framer-76bmaz[^"]*"[^>]*href="[^"]*"[\s\S]*?<\/a>/gi;
  const newLink1 = `<a class="framer-76bmaz framer-fja3wr" data-framer-name="Nav Link" href="/#about"><div class="framer-izkjsp-container"><div class="framer-ypCW0 framer-zl1g6k framer-v-zl1g6k" data-framer-name="Medium"><div class="framer-w9fus0-container" data-code-component-plugin-id="api"><span style="font-family:'Lay Grotesk Regular', 'Lay Grotesk Regular Placeholder', sans-serif;font-size:17px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.2em;color:var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(255, 240, 202));position:relative;display:inline-block;white-space:nowrap;user-select:none;vertical-align:top">About</span></div></div></div></a>`;
  html = html.replace(link1Regex, newLink1);

  // 3. Replace Link 2 (Contact) inside nav
  const link2Regex = /<a class="framer-1cydv88[^"]*"[^>]*href="[^"]*"[\s\S]*?<\/a>/gi;
  const newLink2 = `<a class="framer-1cydv88 framer-fja3wr" data-framer-name="Nav Link" href="/#contact"><div class="framer-4h7ukm-container"><div class="framer-ypCW0 framer-zl1g6k framer-v-zl1g6k" data-framer-name="Medium"><div class="framer-w9fus0-container" data-code-component-plugin-id="api"><span style="font-family:'Lay Grotesk Regular', 'Lay Grotesk Regular Placeholder', sans-serif;font-size:17px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.2em;color:var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(255, 240, 202));position:relative;display:inline-block;white-space:nowrap;user-select:none;vertical-align:top">Contact</span></div></div></div></a>`;
  html = html.replace(link2Regex, newLink2);

  // 4. Replace Link 3 (Open in Maps CTA Button)
  const link3Regex = /<a class="framer-vO7O2[^"]*"[\s\S]*?<\/a>/gi;
  const newLink3 = `<a class="framer-vO7O2 framer-9t14z3 framer-v-wf9qrl framer-1swxj4p" data-framer-name="White" href="${MAPS_LINK}" target="_blank" rel="noopener noreferrer" style="backdrop-filter:none;background-color:var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(255, 240, 202));corner-shape:superellipse(1);-webkit-backdrop-filter:none;border-bottom-left-radius:2px;border-bottom-right-radius:2px;border-top-left-radius:2px;border-top-right-radius:2px;padding:8px 12px;display:flex;align-items:center;text-decoration:none"><div class="framer-10dp641" data-framer-name="Nav Link"><div class="framer-nbr5p7-container" data-code-component-plugin-id="api"><span style="font-family:'Lay Grotesk Regular', 'Lay Grotesk Regular Placeholder', sans-serif;font-size:17px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.2em;color:var(--token-a0f3f7f0-2bee-4607-a7b2-647fda358cb3, rgb(14, 18, 1));position:relative;display:inline-block;white-space:nowrap;user-select:none;vertical-align:top;margin-right:6px">Open in Maps</span></div></div><div class="framer-1ko9uiy" style="display:flex;align-items:center"><div data-framer-component-type="SVG" class="framer-14b9qd0" aria-hidden="true" style="width:10px;height:10px;display:inline-block"><svg viewBox="0 0 10 10" style="width:10px;height:10px;display:block"><path d="M 3 0 L 3 1 L 5.98 1 C 6.83 1 7.26 2.03 6.66 2.63 L 0 9.29 L 0.71 10 L 7.37 3.34 C 7.97 2.74 9 3.16 9 4.02 L 9 7 L 10 7 L 10 0 Z" fill="var(--token-a0f3f7f0-2bee-4607-a7b2-647fda358cb3, rgb(14, 18, 1))"/></svg></div><div data-framer-component-type="SVG" class="framer-m12jrg" aria-hidden="true" style="width:10px;height:10px;display:inline-block;margin-left:2px"><svg viewBox="0 0 10 10" style="width:10px;height:10px;display:block"><path d="M 3 0 L 3 1 L 5.98 1 C 6.83 1 7.26 2.03 6.66 2.63 L 0 9.29 L 0.71 10 L 7.37 3.34 C 7.97 2.74 9 3.16 9 4.02 L 9 7 L 10 7 L 10 0 Z" fill="var(--token-a0f3f7f0-2bee-4607-a7b2-647fda358cb3, rgb(14, 18, 1))"/></svg></div></div></a>`;
  html = html.replace(link3Regex, newLink3);

  // 5. Ensure the Logo (left) uses the exact inline SVG or verified path
  // Replace the contents of any <a ... data-framer-name="Logo" ...>
  const logoLinkRegex = /<a[^>]*data-framer-name="Logo"[^>]*>[\s\S]*?<\/a>/gi;
  const newLogo = `<a aria-label="The Grand Lucknow" class="framer-1ngqbpf framer-19qr6g5" data-framer-name="Logo" href="/" style="transform:none;text-decoration:none"><div data-framer-component-type="SVG" data-framer-name="Logo" class="framer-gyzc1k" aria-hidden="true" style="flex-shrink:0;width:216px;height:27px"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216.285 27" width="216" height="27" fill="none"><path d="${theGrandD}" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(255, 240, 202))"/></svg></div></a>`;
  html = html.replace(logoLinkRegex, newLogo);

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Successfully cleaned and applied header to:', path.basename(filePath));
}

cleanNav(path.join(root, 'venues/venue-n1.html'));
cleanNav(path.join(root, 'venues/open-earth-lawn.html'));
cleanNav(path.join(root, 'venues/boutique-n1.html'));
