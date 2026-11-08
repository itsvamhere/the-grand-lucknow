import fs from 'fs';

const artifactDir = 'C:/Users/Sambhav/.gemini/antigravity/brain/638b99fe-ea95-4ed2-88eb-ad4caad31b4c';

[
  'proof_open-earth-lawn_desktop.png',
  'proof_grassland-gala_desktop.png',
  'proof_garden-galaxy_desktop.png',
  'proof_the-grand-courtyard_desktop.png',
  'proof_the-royal-legacy-banquet_desktop.png'
].forEach(file => {
  const src = `tools/${file}`;
  const dst = `${artifactDir}/${file}`;
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
    console.log(`Copied ${src} to ${dst}`);
  }
});
