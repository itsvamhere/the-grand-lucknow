import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

console.log('=== 1. Updating Imprint (RLhzQFk4u8SCr1ATTFCwyOJSRszGyzmpaoHYDZIbFNM.CUXFb53O.mjs) ===');
const imprintPath = path.join(projectDir, 'scripts/RLhzQFk4u8SCr1ATTFCwyOJSRszGyzmpaoHYDZIbFNM.CUXFb53O.mjs');
let imprint = fs.readFileSync(imprintPath, 'utf-8');

imprint = imprint.replaceAll('The Grand (Banquet & Event Estate)', 'The Grand (Banquet & Event Estate)');
imprint = imprint.replaceAll('22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301, India', '22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301, India');
imprint = imprint.replaceAll('Legal form: sole proprietorship (Einzelunternehmen)', 'Enterprise: Luxury Hospitality & Event Venue');
imprint = imprint.replaceAll('Trade authority: Magistrat Lucknow', 'Registered Authority: Lucknow Nagar Nigam, Uttar Pradesh');
imprint = imprint.replaceAll('Member of the Indian Economic Chamber, Styria (WKO Steiermark)', 'Registered Event & Hospitality Facility, Uttar Pradesh Tourism');
imprint = imprint.replaceAll('ris.bka.gv.at', 'thegrandlucknow.in');
imprint = imprint.replaceAll('Rental of event venues (accommodation) in Lucknow.', 'Premier luxury banquet, wedding lawns and celebration hospitality estate in Lucknow.');
imprint = imprint.replaceAll('Information about the The Grand venues and the option to book them directly.', 'Official presentation of The Grand event spaces, banquet halls, lush lawns, and reservation inquiries.');
imprint = imprint.replaceAll('office@thegrandlucknow.in', 'Thegrandbanquet07@gmail.com');
imprint = imprint.replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice');
imprint = imprint.replaceAll('children:`Edifice`', 'children:`Edifice`');
imprint = imprint.replaceAll('children:`Built by`', 'children:`Built by`');

fs.writeFileSync(imprintPath, imprint, 'utf-8');
console.log('✓ Updated Imprint');

console.log('=== 2. Updating Terms (-DcStZJFIhsBH2N6z7an1MDNvSqrOU1xTseJDDDYkrQ.Cf76yzJq.mjs) ===');
const termsPath = path.join(projectDir, 'scripts/-DcStZJFIhsBH2N6z7an1MDNvSqrOU1xTseJDDDYkrQ.Cf76yzJq.mjs');
let terms = fs.readFileSync(termsPath, 'utf-8');

terms = terms.replaceAll('Moritz Steinlechner, 22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301, India', 'The Grand, 22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301, India');
terms = terms.replaceAll(
  'These terms apply to the short-term rental of the The Grand venues to guests for private or business stays.',
  'These terms apply to event reservations, banquet bookings, and celebration estate hosting at The Grand, Lucknow.'
);
terms = terms.replaceAll(
  'A booking creates a binding accommodation contract. For direct bookings on our website, the contract is concluded once the payment has been completed successfully; you will receive a confirmation by email.',
  'A booking creates a binding event hosting agreement. For reservations made through our venue coordination team or website, the booking is confirmed upon receipt of the advance reservation payment and signed schedule.'
);
terms = terms.replaceAll(
  'Under § 18 (1) no. 10 of the Indian Distance and Off-Premises Contracts Act (FAGG), there is no statutory right of withdrawal for accommodation services booked for specific dates. The cancellation policy under section 6 applies.',
  'Event date reservations are secured exclusively for your occasion. In accordance with applicable commercial hospitality regulations, cancellation and date adjustments are governed by Section 6 of these terms.'
);
terms = terms.replaceAll(
  'All prices are final prices in euros per stay and include the final cleaning.',
  'All booking quotes are stated in Indian Rupees (INR) plus applicable Goods and Services Tax (GST).'
);
terms = terms.replaceAll(
  'The City of Lucknow tourist tax (currently €2.50 per person aged 15 and over per night) is not included in the accommodation price and is shown separately.',
  'Government taxes (GST) and statutory municipal event permits are processed in accordance with local regulations.'
);
terms = terms.replaceAll(
  'For direct bookings on our website, the total amount including the tourist tax is paid at the time of booking via the payment provider Stripe. For bookings through platforms, the platform’s payment terms apply.',
  'Payments are processed via authorized banking channels, RTGS/NEFT, UPI, or designated payment gateways. A deposit schedule applies for securing wedding and event dates.'
);
terms = terms.replaceAll(
  '– The venue may only be used by the number of guests booked.\n– Parties, events and loud celebrations are not permitted.\n– Smoking is not allowed in the venue.\n– Pets are only allowed by prior arrangement.',
  '– The estate facilities are dedicated to weddings, receptions, galas, corporate conferences, and celebratory gatherings.\n– Sound levels and outdoor celebrations adhere to local municipal guidelines.\n– Smoking is strictly prohibited within closed banquet halls; designated outdoor smoking lounges are provided.\n– Valet parking and private security staff ensure smooth guest management.'
);
terms = terms.replaceAll(
  '– Baby cot: €20 per stay (incl. mattress, sheet, blanket and pillow; please request in advance)\n– Further services by arrangement.',
  '– Bespoke Mandap decor, customized floral arrangements, and stage lighting.\n– Dedicated bridal suites and family preparation lounges included with full-estate bookings.\n– Premium multi-cuisine catering partnerships and event coordination services.'
);
terms = terms.replaceAll('office@thegrandlucknow.in', 'Thegrandbanquet07@gmail.com');

fs.writeFileSync(termsPath, terms, 'utf-8');
console.log('✓ Updated Terms');

console.log('=== 3. Updating Privacy (k8tn8BJfwySqaZWkAYD4XG30F0GcCEX0iKFVF7CmhHc.D8-NMBX-.mjs) ===');
const privacyPath = path.join(projectDir, 'scripts/k8tn8BJfwySqaZWkAYD4XG30F0GcCEX0iKFVF7CmhHc.D8-NMBX-.mjs');
let privacy = fs.readFileSync(privacyPath, 'utf-8');

privacy = privacy.replaceAll('The Grand (Banquet & Event Estate)', 'The Grand (Banquet & Event Estate)');
privacy = privacy.replaceAll('22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301, India', '22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301, India');
privacy = privacy.replaceAll('office@thegrandlucknow.in', 'Thegrandbanquet07@gmail.com');
privacy = privacy.replaceAll('Our website links to Instagram, LinkedIn and Google Maps.', 'Our website links to Instagram, Facebook and Google Maps.');
privacy = privacy.replaceAll('dsb.gv.at', 'thegrandlucknow.in');
privacy = privacy.replaceAll(
  'We process your data exclusively on the basis of the statutory provisions (GDPR, Indian Data Protection Act, Indian Telecommunications Act 2021).',
  'We process your data exclusively in accordance with applicable laws including the Digital Personal Data Protection Act (DPDPA 2023) of India.'
);

fs.writeFileSync(privacyPath, privacy, 'utf-8');
console.log('✓ Updated Privacy');

console.log('=== 4. Updating Footer Attribution to "Built by Edifice" (elvar.in/edifice) ===');
const sharedPath = path.join(projectDir, 'scripts/shared-lib.DganPNQZ.mjs');
let shared = fs.readFileSync(sharedPath, 'utf-8');

shared = shared.replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice');
shared = shared.replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice');
shared = shared.replaceAll('eYOd1t1bt:`Edifice`', 'eYOd1t1bt:`Edifice`');
shared = shared.replaceAll('children:`Built by`', 'children:`Built by`');

fs.writeFileSync(sharedPath, shared, 'utf-8');
console.log('✓ Updated shared-lib with Built by Edifice');

// Update index.html
let html = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf-8');

html = html.replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice');
html = html.replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice');
html = html.replaceAll('Built by', 'Built by');

// Replace rolling label for Nexene to Edifice
const nexenePattern = /<span data-rolling-label[^>]*><span style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect\(0 0 0 0\);white-space:nowrap;border:0">Nexene<\/span>[\s\S]*?<\/span>/g;

function buildRollingSpans(word) {
  let res = `<span style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0">${word}</span>`;
  for (const char of word) {
    res += `<span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden">${char}</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none">${char}</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)">${char}</span></span>`;
  }
  return res;
}

html = html.replace(nexenePattern, (match) => {
  return match.replace(/<span style="position:absolute[\s\S]*?<\/span>/, buildRollingSpans('Edifice'));
});

// Update address in index.html JSON-LD
html = html.replaceAll('22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301, India', '22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301, India');
html = html.replaceAll('"addressLocality":"Lucknow","addressRegion":"Styria","addressCountry":"AT"', '"streetAddress":"22, Raibareli Rd, Bindaua","addressLocality":"Lucknow","addressRegion":"Uttar Pradesh","postalCode":"226301","addressCountry":"IN"');
html = html.replaceAll('events@thegrandlucknow.in', 'Thegrandbanquet07@gmail.com');

fs.writeFileSync(path.join(projectDir, 'index.html'), html, 'utf-8');
console.log('✓ Updated index.html with Built by Edifice & real address');

// Update server.mjs swapText
let server = fs.readFileSync(path.join(projectDir, 'server.mjs'), 'utf-8');
server = server.replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice');
server = server.replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice');
server = server.replaceAll('Nexene', 'Edifice');
server = server.replaceAll('Built by', 'Built by');
server = server.replaceAll('22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301, India', '22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301, India');
server = server.replaceAll('Moritz Steinlechner', 'The Grand');

fs.writeFileSync(path.join(projectDir, 'server.mjs'), server, 'utf-8');
console.log('✓ Updated server.mjs');

console.log('All legal pages and attribution updated successfully!');
