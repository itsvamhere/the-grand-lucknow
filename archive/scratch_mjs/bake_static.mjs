import fs from 'node:fs';
import path from 'node:path';

const base = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

function swapText(content) {
  if (typeof content !== 'string') return content;
  return content
    .replaceAll('https://nexene.at/', 'https://elvar.in/edifice')
    .replaceAll('https://nexene.at', 'https://elvar.in/edifice')
    .replaceAll('Made with love by', 'Built by')
    .replaceAll('eYOd1t1bt:`Nexene`', 'eYOd1t1bt:`Edifice`')
    .replaceAll('children:`Nexene`', 'children:`Edifice`')
    .replaceAll('children:`Made with love by`', 'children:`Built by`')
    .replaceAll('children:`Design & development`', 'children:`Built by`')
    .replaceAll('or your stay?', 'or your celebration?')
    .replaceAll('or your stay', 'or your celebration')
    .replaceAll('send me an email', 'send us an email')
    .replaceAll('give me a call', 'give us a call')
    .replaceAll('send me', 'send us')
    .replaceAll('give me', 'give us')
    .replaceAll("I'd be happy to help you personally", 'We would be delighted to assist you with your celebration')
    .replaceAll('I’d be happy to help you personally', 'We would be delighted to assist you with your celebration')
    .replaceAll('https://www.linkedin.com/in/thegrand-steinlechner-045a4417b/', 'https://www.facebook.com/thegrandlucknow/')
    .replaceAll('https://www.linkedin.com/in/thegrand-steinlechner-045a4417b', 'https://www.facebook.com/thegrandlucknow/')
    .replaceAll('https://www.linkedin.com/in/moritz-steinlechner-045a4417b/', 'https://www.facebook.com/thegrandlucknow/')
    .replaceAll('https://www.linkedin.com/in/moritz-steinlechner-045a4417b', 'https://www.facebook.com/thegrandlucknow/')
    .replaceAll('eYOd1t1bt:`LinkedIn`', 'eYOd1t1bt:`Facebook`')
    .replaceAll('>LinkedIn<', '>Facebook<')
    .replaceAll('Boutique N°1', 'N°01')
    .replaceAll('Boutique N°2', 'N°02')
    .replaceAll('Boutique N°3', 'N°03')
    .replaceAll('Boutique N°4', 'N°04')
    .replaceAll('label:`Venue Details`', 'label:`Details`')
    .replaceAll('label:`Apartment Details`', 'label:`Details`')
    .replaceAll('text:`Venue Details`', 'text:`Details`')
    .replaceAll('text:`Apartment Details`', 'text:`Details`')
    .replaceAll('Apartment Details ↗', 'Details ↗')
    .replaceAll('Venue Details ↗', 'Details ↗')
    .replaceAll('Apartment Details', 'Details')
    .replaceAll('Venue Details', 'Details')
    .replaceAll('Apartment Size', 'Venue Scale')
    .replaceAll('Apartment size', 'Venue scale')
    .replaceAll('45 m²', '20,000 sq ft')
    .replaceAll('45&nbsp;m²', '20,000 sq ft')
    .replaceAll('20,000 sq ft sq ft', '20,000 sq ft')
    .replaceAll('>m²<', '>sq ft<')
    .replaceAll('>m²</span>', '>sq ft</span>')
    .replaceAll('m²', 'sq ft')
    .replaceAll('My Philosophy', 'Our Vision')
    .replaceAll('a temporary home deserves just as much care as your own home.', 'every celebration deserves a setting as grand as your vision.')
    .replaceAll('a temporary home deserves as much care as your own.', 'every celebration deserves a setting as grand as your vision.')
    .replaceAll("Hi, I'm Moritz", "Architectural Poise & Estate Hospitality")
    .replaceAll('I believe', 'We believe')
    .replaceAll('Schönaugasse 76, 8010 Lucknow, India', '22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301, India')
    .replaceAll('Moritz Steinlechner, The Grand', 'The Grand (Banquet & Event Estate)');
}

let count = 0;
function walk(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item === 'node_modules' || item === '.git' || item === 'server.mjs' || item.startsWith('generate_') || item.startsWith('verify_') || item.startsWith('bake_')) continue;
    const full = path.join(dir, item);
    const s = fs.statSync(full);
    if (s.isDirectory()) walk(full);
    else if (item.endsWith('.html') || item.endsWith('.mjs') || item.endsWith('.js')) {
      const orig = fs.readFileSync(full, 'utf8');
      const swapped = swapText(orig);
      if (swapped !== orig) {
        fs.writeFileSync(full, swapped, 'utf8');
        count++;
      }
    }
  }
}

walk(base);
console.log('Successfully baked static swaps into', count, 'files!');
