import fs from 'node:fs';
import { contours } from 'd3-contour';
import { geoPath, geoTransform } from 'd3-geo';

const grid = JSON.parse(fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/elevation_grid.json', 'utf8'));

console.log('Grid dimensions:', grid.cols, 'x', grid.rows);
console.log('Elevation range:', grid.minElev, 'to', grid.maxElev);

// Canvas projection parameters
const width = 1600;
const height = 900;
const centerLon = 80.9992764; // The Grand Lucknow
const centerLat = 26.6355667;
const cosLat = Math.cos((centerLat * Math.PI) / 180);
const scale = 6141.443;
const centerX = 720;
const centerY = 480;

function projectLonLat(lon, lat) {
  const x = (lon - centerLon) * cosLat * scale + centerX;
  const y = -(lat - centerLat) * scale + centerY;
  return [x, y];
}

// Convert grid coordinate (c, r) in [0..cols-1, 0..rows-1] to canvas pixel (x, y)
function gridToPixel(c, r) {
  const lon = grid.minLon + (c / (grid.cols - 1)) * (grid.maxLon - grid.minLon);
  const lat = grid.maxLat - (r / (grid.rows - 1)) * (grid.maxLat - grid.minLat);
  return projectLonLat(lon, lat);
}

// Custom d3 geoTransform that maps contour coordinates [c, r] to canvas [x, y]
const transform = geoTransform({
  point: function(c, r) {
    const [x, y] = gridToPixel(c, r);
    this.stream.point(Math.round(x * 10) / 10, Math.round(y * 10) / 10);
  }
});

const pathGenerator = geoPath().projection(transform);

// Define thresholds between minElev (115) and maxElev (127)
// Every 1.5 meters or 2 meters: 116, 118, 120, 122, 124, 126
const thresholds = [116, 117.5, 119, 120.5, 122, 123.5, 125];
console.log('Generating contour polygons for thresholds:', thresholds);

const contourGenerator = contours()
  .size([grid.cols, grid.rows])
  .thresholds(thresholds)
  .smooth(true);

const contourFeatures = contourGenerator(grid.elevations);
console.log('Generated contour features count:', contourFeatures.length);

const contourPaths = contourFeatures.map((feat, idx) => {
  const d = pathGenerator(feat);
  return {
    value: feat.value,
    threshold: thresholds[idx] || feat.value,
    d
  };
});

fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/generated_contours.json', JSON.stringify(contourPaths, null, 2));
console.log('Saved generated_contours.json successfully!');
