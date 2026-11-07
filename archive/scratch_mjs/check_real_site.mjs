async function checkTheGrandSite() {
  try {
    const res = await fetch('https://thegrandlucknow.in', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    console.log('Homepage status:', res.status);
    const html = await res.text();
    console.log('Homepage length:', html.length);

    // Look for venue names or links
    const matches = [...html.matchAll(/href=["']([^"']*(?:venue|lawn|hall|banquet|gallery|about)[^"']*)["']/gi)];
    console.log('Relevant links found:');
    matches.forEach(m => console.log(' - ', m[1]));

    // Search for headings or lists of venues
    const venueMatches = [...html.matchAll(/(?:Grassland|Lawn|Banquet|Courtyard|Galaxy|Legacy|Pillarless)[^<>\n\r]{0,60}/gi)];
    console.log('\nVenue mentions:');
    const unique = [...new Set(venueMatches.map(m => m[0].trim()))];
    unique.forEach(u => console.log(' *', u));
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}

checkTheGrandSite();
