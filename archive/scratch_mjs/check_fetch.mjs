import fs from 'fs';

async function fetchRoute() {
  const res = await fetch('http://localhost:3003/venues/venue-n2');
  const text = await res.text();
  console.log('Status:', res.status);
  console.log('Length:', text.length);
  console.log('Includes grand-booking-modal:', text.includes('grand-booking-modal'));
  console.log('Title in fetched HTML:', text.match(/<title>.*?<\/title>/)?.[0]);
}

fetchRoute();
