import fs from 'fs';

const can = fs.readFileSync('tools/canonical_footer.html', 'utf8');
console.log('Has office@thegrandlucknow.in?', can.includes('office@thegrandlucknow.in'));
console.log('Has Venues?', can.includes('Venues'));
console.log('Has Facebook?', can.includes('Facebook'));
console.log('Has +91 9129127091?', can.includes('+91 9129127091'));
console.log('Has Built by Edifice?', can.includes('Built by Edifice'));
console.log('Has framer-xj8hz2?', can.includes('framer-xj8hz2'));
