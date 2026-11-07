async function parseRealVenues() {
  const url = 'https://thegrandlucknow.in/assets/index-DAQ-Aurb.js';
  const res = await fetch(url);
  const code = await res.text();
  console.log('JS bundle length:', code.length);

  // Look for JSON-like venue objects or array of 5 venues
  // Let's find matches for "Grassland", "Lawn", "Banquet", "capacity", "sqft", "area"
  const matches = [...code.matchAll(/\{[^{}]*(?:sqft|capacity|guests|venue|lawn|banquet)[^{}]*\}/gi)];
  console.log(`Found ${matches.length} matching candidate objects`);
  matches.slice(0, 15).forEach((m, i) => console.log(`[${i}] ${m[0]}`));

  // Also search for strings like "5 venues" or venue names
  const strings = [...code.matchAll(/"([^"]*(?:Lawn|Banquet|Hall|Gala|Courtyard|Galaxy|Legacy)[^"]*)"/gi)];
  console.log('\nVenue string occurrences:');
  const uniqueStrs = [...new Set(strings.map(s => s[1]))];
  uniqueStrs.forEach(s => console.log(' *', s));
}

parseRealVenues();
