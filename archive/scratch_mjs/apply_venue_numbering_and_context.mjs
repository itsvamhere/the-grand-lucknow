import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

const oldP1 = `The Grand was envisioned as a sanctuary for landmark celebrations. Hosting gatherings surrounded by nature is our enduring passion.`;
const oldP2 = `What matters most to us is simple: that you and your guests feel effortlessly looked after. Our venues are expansive, light-filled spaces set within lush greenery where elegance and comfort meet naturally. Each setting is crafted to give every wedding and event its own distinct character.`;
const oldP3 = `Our dedicated team orchestrates every celebration with care, from planning to the final toast.`;

const newP1 = `The Grand was envisioned as a sanctuary for landmark celebrations. Hosting gatherings surrounded by nature is our enduring passion.`;
const newP2 = `What matters most to us is simple: that you and your guests feel effortlessly looked after. Our venues are expansive, light-filled spaces set within lush greenery where elegance and comfort meet naturally. Each setting is crafted to give every wedding and event its own distinct character.`;
const newP3 = `Our dedicated team orchestrates every celebration with care, from planning to the final toast.`;

const oldAboutText = `${oldP1}\n\n${oldP2}\n\n${oldP3}`;
const newAboutText = `${newP1}\n\n${newP2}\n\n${newP3}`;

function applyReplacements(content) {
  let c = content;

  // 1. Context: remove individual-led phrasing
  c = c.replaceAll('We believe', 'We believe');
  c = c.replaceAll('every celebration deserves a setting as grand as your vision.', 'every celebration deserves a setting as grand as your vision.');
  c = c.replaceAll('every celebration deserves a setting as grand as your vision.', 'every celebration deserves a setting as grand as your vision.');
  c = c.replaceAll(oldAboutText, newAboutText);
  c = c.replaceAll(oldP1, newP1);
  c = c.replaceAll(oldP2, newP2);
  c = c.replaceAll(oldP3, newP3);
  c = c.replaceAll("Our team orchestrates every celebration with care and is delighted to assist with every detail.", "Our team orchestrates every celebration with care and is delighted to assist with every detail.");

  // 2. Numbering: Venue N°1 through Venue N°9
  // Casa Momo names
  c = c.replaceAll('Venue N°1', 'Venue N°1');
  c = c.replaceAll('Venue N°2', 'Venue N°2');
  c = c.replaceAll('Venue N°3', 'Venue N°3');
  c = c.replaceAll('Venue N°4', 'Venue N°4');
  c = c.replaceAll('Venue N°5', 'Venue N°5');
  c = c.replaceAll('Venue N°6', 'Venue N°6');
  c = c.replaceAll('Venue N°7', 'Venue N°7');
  c = c.replaceAll('Venue N°8', 'Venue N°8');
  c = c.replaceAll('Venue N°9', 'Venue N°9');

  // Our previous names
  c = c.replaceAll('Venue N°1', 'Venue N°1');
  c = c.replaceAll('Venue N°2', 'Venue N°2');
  c = c.replaceAll('Venue N°3', 'Venue N°3');
  c = c.replaceAll('Venue N°4', 'Venue N°4');
  c = c.replaceAll('Venue N°5', 'Venue N°5');
  c = c.replaceAll('Venue N°6', 'Venue N°6');
  c = c.replaceAll('Venue N°7', 'Venue N°7');
  c = c.replaceAll('Venue N°8', 'Venue N°8');
  c = c.replaceAll('Venue N°9', 'Venue N°9');

  return c;
}

// Apply to all relevant files
function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git') {
        results.push(...scanDir(fullPath));
      }
    } else if (/\.(mjs|js|html)$/.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = scanDir(projectDir);
let changedCount = 0;

for (const f of files) {
  const original = fs.readFileSync(f, 'utf8');
  const updated = applyReplacements(original);
  if (updated !== original) {
    fs.writeFileSync(f, updated, 'utf8');
    changedCount++;
    console.log(`Updated: ${path.relative(projectDir, f)}`);
  }
}

console.log(`Completed replacements in ${changedCount} files.`);
