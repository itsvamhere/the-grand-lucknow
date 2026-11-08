import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Check location overlap script
const scripts = [...html.matchAll(/<script[\s\S]*?<\/script>/g)].map(m => m[0]);
console.log('Scripts count:', scripts.length);
scripts.forEach((s, idx) => {
  if (s.includes('Location') || s.includes('opacity') || s.includes('scroll') || s.includes('overlap')) {
    console.log(`Script ${idx}:`, s);
  }
});

// Check Venue Lists section
const vList = html.match(/data-framer-name="Venue Lists"[\s\S]*?(?=data-framer-name="Footer"|<footer|<\/main)/);
if (vList) {
  console.log('Venue Lists section length:', vList[0].length);
  // print links and card names inside Venue Lists
  const links = [...vList[0].matchAll(/href="([^"]+)"/g)].map(m => m[1]);
  console.log('Venue Lists hrefs:', links);
  const titles = [...vList[0].matchAll(/<h\d[^>]*>([\s\S]*?)<\/h\d>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log('Venue Lists titles:', titles);
}

// Check Gallery section
const galleryMatch = html.match(/data-framer-name="Venue Gallery"[\s\S]*?(?=data-framer-name="Overview"|data-framer-name="Features"|data-framer-name="Details"|<div[^>]*data-framer-name="Content")/);
if (galleryMatch) {
  console.log('Gallery section length:', galleryMatch[0].length);
  const imgs = [...galleryMatch[0].matchAll(/<img[^>]+src="([^">]+)"/g)].map(m => m[1]);
  console.log('Gallery imgs:', imgs);
}
