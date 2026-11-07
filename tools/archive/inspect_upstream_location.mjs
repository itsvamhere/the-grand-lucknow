import fs from 'fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/upstream_boutique-n1.html', 'utf8');
const locIdx = html.indexOf('data-framer-name="Location"');
console.log('Location index in upstream_boutique-n1.html:', locIdx);
if (locIdx !== -1) {
  const sectionEnd = html.indexOf('</section>', locIdx);
  const snippet = html.substring(locIdx, sectionEnd + 10);
  fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/tools/upstream_location_section.html', snippet);
  console.log('Saved upstream_location_section.html, length:', snippet.length);
}

// Also check temp_google_map.html
if (fs.existsSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/temp_google_map.html')) {
  const tempMap = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/temp_google_map.html', 'utf8');
  console.log('temp_google_map.html length:', tempMap.length);
  console.log('temp_google_map snippet:', tempMap.substring(0, 1000));
}
