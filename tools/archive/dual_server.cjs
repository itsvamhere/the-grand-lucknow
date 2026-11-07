const http = require('http');
const fs = require('fs');
const path = require('path');
const root = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

const mimeMap = {
  '.html': 'text/html', '.js': 'application/javascript', '.mjs': 'application/javascript',
  '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.woff2': 'font/woff2', '.woff': 'font/woff',
  '.svg': 'image/svg+xml', '.json': 'application/json', '.txt': 'text/plain'
};

function createServer(port) {
  const s = http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0];
    if (urlPath === '/') urlPath = '/index.html';

    // Redirect legacy boutique routes to /venues/open-earth-lawn
    if (
      urlPath === '/venues/boutique-n1' ||
      urlPath === '/venues/boutique-n1.html' ||
      urlPath === '/apartments/boutique-n1' ||
      urlPath === '/apartments/boutique-n1.html'
    ) {
      res.writeHead(301, {
        'Location': '/venues/open-earth-lawn',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end();
      return;
    }

    // Direct alias: /venues/venue-n1 serves open-earth-lawn.html
    if (urlPath === '/venues/venue-n1' || urlPath === '/venues/venue-n1.html') {
      urlPath = '/venues/open-earth-lawn.html';
    }

    // Direct alias: /venues/open-earth-lawn serves open-earth-lawn.html
    if (urlPath === '/venues/open-earth-lawn') {
      urlPath = '/venues/open-earth-lawn.html';
    }

    // Direct alias: /book serves contact.html
    if (urlPath === '/book' || urlPath === '/book.html') {
      urlPath = '/contact.html';
    }
    
    let fp = path.join(root, urlPath);
    // If not found directly, check with .html appended
    if (!fs.existsSync(fp) && fs.existsSync(fp + '.html')) {
      fp = fp + '.html';
    }

    // If directory, resolve to index.html or venues fallback
    if (fs.existsSync(fp) && fs.statSync(fp).isDirectory()) {
      if (fs.existsSync(path.join(fp, 'index.html'))) {
        fp = path.join(fp, 'index.html');
      } else if (urlPath.startsWith('/venues')) {
        fp = path.join(root, 'venues/open-earth-lawn.html');
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found: ' + urlPath);
        return;
      }
    }

    // Fallback for any other venue links (e.g. /venues/grassland-gala) to open-earth-lawn.html if file doesn't exist yet
    if (!fs.existsSync(fp) && urlPath.startsWith('/venues/')) {
      fp = path.join(root, 'venues/open-earth-lawn.html');
    }

    if (!fs.existsSync(fp)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found: ' + urlPath);
      return;
    }

    const ext = path.extname(fp).toLowerCase();
    const ct = mimeMap[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': ct,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Access-Control-Allow-Origin': '*'
    });
    const stream = fs.createReadStream(fp);
    stream.on('error', (err) => {
      if (!res.headersSent) res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal server error: ' + err.message);
    });
    stream.pipe(res);
  });

  s.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://localhost:${port} and http://127.0.0.1:${port}`);
  });
  return s;
}

createServer(3000);
createServer(3003);
