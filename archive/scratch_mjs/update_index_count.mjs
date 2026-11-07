import fs from 'fs';

let content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

// Replace any static count of 9 with 5
content = content.replace(/(<span[^>]*>)9(<\/span>.*?<span[^>]*>Venues<\/span>)/s, '$15$2');
content = content.replace(/(<span[^>]*>)9(<\/span>)/g, (match, prefix, suffix, offset) => {
  // If near "Venues"
  const nearby = content.substring(Math.max(0, offset - 100), Math.min(content.length, offset + 100));
  if (nearby.includes('Venues') || nearby.includes('venues')) {
    return `${prefix}5${suffix}`;
  }
  return match;
});

fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', content, 'utf8');
console.log('Updated index.html count to 5');
