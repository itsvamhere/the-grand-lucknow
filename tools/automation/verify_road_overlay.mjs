import sharp from 'sharp';

// We import the geometries
import {
  highwayG, railwayG, bindauaEntranceG, bindauaLoopG, bindauaNorthStreetG,
  bindauaToAhmadpurG, badanKheraRoadG, ahmadpurMainStreetG, ahmadpurToKankahaG,
  ahmadpurNorthRuralG, kankahaRoad24BG, kankahaEastG, kankahaToHighwayG,
  gauraWindingRoadG, gauraLoopConnectorG, gauraNorthBranchG, gauraToHighwayG,
  sardarEntranceRoadG, sardarCampusLoopG, sardarWestRoadG, westNorthSouthRoadG,
  fieldTracksG
} from './road_geometries.mjs';

function toSvgPath(pts) {
  return 'M ' + pts.map(p => `${p[0]} ${p[1]}`).join(' L ');
}

// Build SVG overlay in 1024x541 coordinate space
let pathsSvg = '';

// Highway
pathsSvg += `<path d="${toSvgPath(highwayG)}" stroke="#FF0000" stroke-width="4" fill="none" opacity="0.85" />\n`;
// Railway
pathsSvg += `<path d="${toSvgPath(railwayG)}" stroke="#0000FF" stroke-width="3" stroke-dasharray="6,4" fill="none" opacity="0.85" />\n`;

// Major connecting roads
const majors = [
  badanKheraRoadG, kankahaRoad24BG, gauraToHighwayG, kankahaToHighwayG,
  bindauaToAhmadpurG, ahmadpurToKankahaG, sardarWestRoadG
];
majors.forEach(m => {
  pathsSvg += `<path d="${toSvgPath(m)}" stroke="#00FF00" stroke-width="2.5" fill="none" opacity="0.85" />\n`;
});

// Minor / village roads
const minors = [
  bindauaEntranceG, bindauaLoopG, bindauaNorthStreetG, ahmadpurMainStreetG,
  ahmadpurNorthRuralG, kankahaEastG, gauraWindingRoadG, gauraLoopConnectorG,
  gauraNorthBranchG, sardarEntranceRoadG, sardarCampusLoopG, westNorthSouthRoadG
];
minors.forEach(m => {
  pathsSvg += `<path d="${toSvgPath(m)}" stroke="#FFA500" stroke-width="2" fill="none" opacity="0.85" />\n`;
});

// Field tracks
fieldTracksG.forEach(ft => {
  pathsSvg += `<path d="${toSvgPath(ft)}" stroke="#FFFF00" stroke-width="1.2" fill="none" opacity="0.75" />\n`;
});

const overlaySvg = `<svg width="1024" height="541" xmlns="http://www.w3.org/2000/svg">
${pathsSvg}
</svg>`;

async function checkAlignment() {
  await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793960448682_f7d1928c.jpg')
    .composite([{ input: Buffer.from(overlaySvg), top: 0, left: 0 }])
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_road_alignment_overlay.png');

  console.log('Saved proof_road_alignment_overlay.png');
}

checkAlignment();
