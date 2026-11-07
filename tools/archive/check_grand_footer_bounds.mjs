import fs from 'fs';

const d = fs.readFileSync("C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/tools/the_grand_footer_desktop_d.txt", "utf8");

function getBounds(d) {
  const parts = d.trim().split(/(?=[MLHVCSQTAZmlhvcsqtaz])/);
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const part of parts) {
    const coords = part.slice(1).trim().split(/[\s,]+/).filter(Boolean).map(Number);
    for (let i = 0; i < coords.length; i += 2) {
      if (i + 1 < coords.length) {
        const x = coords[i], y = coords[i+1];
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { minX, maxX, minY, maxY, width: maxX - minX, height: maxY - minY };
}

console.log('The Grand Footer bounds:', getBounds(d));
