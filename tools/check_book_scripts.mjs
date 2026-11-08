import fs from 'fs';

const html = fs.readFileSync('book/venue.html', 'utf8');

const scripts = html.match(/<script[^>]*src="[^"]+"[^>]*><\/script>/g) || [];
console.log('Scripts in book/venue.html:', scripts);
