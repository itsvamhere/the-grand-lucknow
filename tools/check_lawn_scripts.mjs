import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const scripts = html.match(/<script[^>]*src="[^"]+"[^>]*><\/script>/g) || [];
console.log('Scripts in open-earth-lawn.html:', scripts);
