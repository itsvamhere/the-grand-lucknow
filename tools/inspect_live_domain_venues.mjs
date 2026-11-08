import fs from 'fs';

async function fetchPage(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
    if (!res.ok) return { ok: false, status: res.status };
    const text = await res.text();
    return { ok: true, status: res.status, text };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function run() {
  console.log('Fetching https://www.thegrandlucknow.in ...');
  const home = await fetchPage('https://www.thegrandlucknow.in');
  if (home.ok) {
    console.log('Homepage fetched, length:', home.text.length);
    fs.writeFileSync('tools/live_domain_home.html', home.text, 'utf8');

    // Extract all venue links on homepage
    const vLinks = [...home.text.matchAll(/href="([^"]*venues[^"]*)"/gi)].map(m => m[1]);
    console.log('Venue links on homepage:', [...new Set(vLinks)]);

    // Check apartment/boutique links if any
    const aptLinks = [...home.text.matchAll(/href="([^"]*apartments[^"]*)"/gi)].map(m => m[1]);
    console.log('Apartment links on homepage:', [...new Set(aptLinks)]);

    // Look for venue names or card names
    const venueItems = [...home.text.matchAll(/data-framer-name="Venue Item"[\s\S]*?<\/a>/g)].map(m => m[0]);
    console.log('Venue Item cards count:', venueItems.length);
    venueItems.forEach((item, idx) => {
      const title = item.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)?.[1]?.replace(/<[^>]+>/g, '').trim() ||
                    item.match(/alt="([^"]+)"/)?.[1] ||
                    item.match(/href="([^"]+)"/)?.[1];
      const href = item.match(/href="([^"]+)"/)?.[1];
      console.log(`Card ${idx + 1}: ${title} -> ${href}`);
    });
  } else {
    console.log('Homepage fetch failed:', home.status || home.error);
  }

  // Check /venues on live domain
  console.log('\nFetching https://www.thegrandlucknow.in/venues ...');
  const venuesPage = await fetchPage('https://www.thegrandlucknow.in/venues');
  if (venuesPage.ok) {
    console.log('/venues fetched, length:', venuesPage.text.length);
    fs.writeFileSync('tools/live_domain_venues.html', venuesPage.text, 'utf8');
    const vLinks2 = [...venuesPage.text.matchAll(/href="([^"]*venues[^"]*)"/gi)].map(m => m[1]);
    console.log('Links on /venues:', [...new Set(vLinks2)]);

    const venueItems2 = [...venuesPage.text.matchAll(/data-framer-name="Venue Item"[\s\S]*?<\/a>/g)].map(m => m[0]);
    console.log('Venue Item cards count on /venues:', venueItems2.length);
    venueItems2.forEach((item, idx) => {
      const title = item.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)?.[1]?.replace(/<[^>]+>/g, '').trim() ||
                    item.match(/alt="([^"]+)"/)?.[1] ||
                    item.match(/href="([^"]+)"/)?.[1];
      const href = item.match(/href="([^"]+)"/)?.[1];
      console.log(`Card ${idx + 1}: ${title} -> ${href}`);
    });
  } else {
    console.log('/venues fetch status:', venuesPage.status || venuesPage.error);
  }
}

run();
