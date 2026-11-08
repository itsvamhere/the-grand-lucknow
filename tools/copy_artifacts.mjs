import fs from 'fs';

const artifactDir = 'C:/Users/Sambhav/.gemini/antigravity/brain/638b99fe-ea95-4ed2-88eb-ad4caad31b4c';

['proof_grassland_gala_footer.png', 'proof_grand_ballroom_footer.png'].forEach(file => {
  const src = `tools/${file}`;
  const dst = `${artifactDir}/${file}`;
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
    console.log(`Copied ${src} to ${dst}`);
  }
});
