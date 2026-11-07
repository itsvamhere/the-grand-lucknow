import fs from 'fs';

async function restoreParallax() {
  const url = 'https://framerusercontent.com/sites/1bk9uGIcxVnDnwzQnwlcko/ParallaxImage.B0avVUfL.mjs';
  console.log('Fetching fresh ParallaxImage from:', url);
  const res = await fetch(url);
  if (!res.ok) {
    console.error('Fetch failed with status:', res.status);
    return;
  }
  const text = await res.text();
  console.log('Fetched successfully! Length:', text.length);
  fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/ParallaxImage.B0avVUfL.mjs', text, 'utf8');
  console.log('Saved clean file to scripts/ParallaxImage.B0avVUfL.mjs');
}

restoreParallax();
