import fs from 'fs';

async function fetchBundle() {
  const url = 'https://www.thegrandlucknow.in/assets/index-DAQ-Aurb.js';
  console.log('Fetching JS bundle:', url);
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) {
    console.error('Failed to fetch bundle:', res.status);
    return;
  }
  const js = await res.text();
  console.log('Bundle fetched, size:', js.length);
  fs.writeFileSync('tools/live_bundle.js', js, 'utf8');

  // Search for venues data in bundle
  const matches = [...js.matchAll(/([a-zA-Z0-9_\-\s]+(?:lawn|ballroom|courtyard|pavilion|mandap|expanse|atrium|suite|venue|hall|garden))/gi)].map(m => m[0].trim());
  console.log('Venue keyword matches count:', matches.length);

  // Look for route definitions (e.g. path: "/...")
  const routes = [...js.matchAll(/path\s*:\s*["']([^"']+)["']/g)].map(m => m[1]);
  console.log('Routes in bundle:', [...new Set(routes)]);

  // Look for JSON or array of venues
  // Search for "venues" or similar keys
  const venueArrayMatches = [...js.matchAll(/venues\s*:\s*\[([\s\S]*?)\]/gi)];
  console.log('venue arrays count:', venueArrayMatches.length);
}

fetchBundle().catch(console.error);
