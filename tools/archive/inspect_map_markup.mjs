import fs from 'fs';
const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const mapIdx = subHtml.indexOf('grand-live-pointer');
console.log('grand-live-pointer at:', mapIdx);
if (mapIdx !== -1) {
  console.log(subHtml.slice(mapIdx - 300, mapIdx + 800));
}

const mapContainerIdx = subHtml.indexOf('data-framer-name="Map"');
console.log('Map container at:', mapContainerIdx);
if (mapContainerIdx !== -1) {
  console.log(subHtml.slice(mapContainerIdx - 100, mapContainerIdx + 500));
}
