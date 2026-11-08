import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const galleryMatch = html.match(/data-framer-name="Venue Gallery"[\s\S]*?(?=data-framer-name="Overview"|data-framer-name="Features"|data-framer-name="Details"|<div[^>]*data-framer-name="Content")/);
if (galleryMatch) {
  const gHtml = galleryMatch[0];
  console.log('Gallery found, length:', gHtml.length);
  // print all <img tags inside gallery
  const imgTags = [...gHtml.matchAll(/<img[^>]+>/g)].map(m => m[0]);
  console.log('Img tags count:', imgTags.length);
  imgTags.forEach((t, i) => console.log(`Slot ${i + 1}:`, t));
}
