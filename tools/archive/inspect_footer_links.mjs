import fs from 'fs';

const footer = fs.readFileSync('tools/extracted_home_footer.html', 'utf8');

const links = footer.match(/href="[^"]*"/g);
console.log('Footer links:', links);

const emails = footer.match(/mailto:[^"']+/g);
console.log('Emails:', emails);

const phones = footer.match(/tel:[^"']+/g);
console.log('Phones:', phones);
