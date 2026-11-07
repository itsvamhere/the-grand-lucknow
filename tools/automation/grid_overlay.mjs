import sharp from 'sharp';

// The image is 1024 x 541
// Let's create an annotated grid overlay on media_1793960448682_f7d1928c.jpg with 100px grid lines
// so we can see the exact pixel coordinates of every single road, junction, village, and landmark!

const svgGrid = `<svg width="1024" height="541">
  <defs>
    <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
      <path d="M 100 0 L 0 0 0 100" fill="none" stroke="red" stroke-width="0.8" opacity="0.4"/>
    </pattern>
  </defs>
  <rect width="1024" height="541" fill="url(#grid)" />
  ${Array.from({length: 11}, (_, i) => `<text x="${i * 100 + 4}" y="15" fill="red" font-size="11" font-family="sans-serif">${i * 100}</text>`).join('\n')}
  ${Array.from({length: 6}, (_, i) => `<text x="5" y="${i * 100 + 15}" fill="red" font-size="11" font-family="sans-serif">${i * 100}</text>`).join('\n')}
</svg>`;

async function makeGrid() {
  await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793960448682_f7d1928c.jpg')
    .composite([{ input: Buffer.from(svgGrid), top: 0, left: 0 }])
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/gmaps_with_grid.png');

  console.log('Saved gmaps_with_grid.png');
}

makeGrid();
