import http from 'http';

http.get('http://localhost:3003/book/venue', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status code:', res.statusCode);
    console.log('Data length:', data.length);
    console.log('Contains #grand-calendar-popup:', data.includes('grand-calendar-popup'));
    console.log('Contains Check Availability:', data.includes('Check Availability'));
    console.log('First 500 chars:\n', data.slice(0, 500));
  });
});
