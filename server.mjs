import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3003;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ico': 'image/x-icon',
};

const VENUE_ALIAS_MAP = {
  'open-earth-lawn': 'open-earth-lawn.html',
  'grassland-gala': 'grassland-gala.html',
  'garden-galaxy': 'garden-galaxy.html',
  'the-grand-courtyard': 'the-grand-courtyard.html',
  'the-royal-legacy-banquet': 'the-royal-legacy-banquet.html',
  'the-courtyard': 'the-grand-courtyard.html',
  'royal-legacy-banquet': 'the-royal-legacy-banquet.html',
  'grand-ballroom': 'the-royal-legacy-banquet.html',
  'venue-n1': 'open-earth-lawn.html',
  'venue-n2': 'grassland-gala.html',
  'venue-n3': 'garden-galaxy.html',
  'venue-n4': 'the-grand-courtyard.html',
  'venue-n5': 'the-royal-legacy-banquet.html',
  'loft-n1': 'the-royal-legacy-banquet.html',
  'boutique-n1': 'open-earth-lawn.html',
  'boutique-n2': 'grassland-gala.html',
  'boutique-n3': 'garden-galaxy.html',
  'boutique-n4': 'the-grand-courtyard.html',
  'boutique-n5': 'the-royal-legacy-banquet.html',
};

function noCacheHeaders(contentType) {
  return {
    'Content-Type': contentType,
    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Access-Control-Allow-Origin': '*',
  };
}

const server = http.createServer((req, res) => {
  let cleanUrl = (req.url || '/').split('?')[0];
  if (cleanUrl.includes('&scale-down-to=')) {
    cleanUrl = cleanUrl.split('&scale-down-to=')[0];
  }
  let reqPath = decodeURI(cleanUrl).replace(/\/+$/, '');
  if (reqPath === '') reqPath = '/index.html';
  if (reqPath === '/apartments') reqPath = '/venues.html';
  if (reqPath === '/book' || reqPath === '/book/apartment') reqPath = '/book/venue.html';

  if (reqPath.startsWith('/apartments/')) {
    res.writeHead(308, { Location: '/venues' });
    res.end();
    return;
  }

  let filePath = path.join(__dirname, reqPath.replace(/^\//, ''));

  // Resolve clean HTML routes (e.g. /venues -> venues.html)
  let candidateHtml = filePath;
  if (!candidateHtml.endsWith('.html') && fs.existsSync(candidateHtml + '.html')) {
    candidateHtml += '.html';
  }
  if (candidateHtml.endsWith('.html') && fs.existsSync(candidateHtml) && fs.statSync(candidateHtml).isFile()) {
    res.writeHead(200, noCacheHeaders(MIME['.html']));
    fs.createReadStream(candidateHtml).pipe(res);
    return;
  }

  // Handle venue canonical slugs & vercel.json aliases
  if (reqPath.startsWith('/venues/')) {
    const slug = reqPath.replace(/^\/venues\//, '').replace(/\/$/, '').replace(/\.html$/, '');
    const mapped = VENUE_ALIAS_MAP[slug];
    if (mapped) {
      const venuePath = path.join(__dirname, 'venues', mapped);
      if (fs.existsSync(venuePath)) {
        res.writeHead(200, noCacheHeaders(MIME['.html']));
        fs.createReadStream(venuePath).pipe(res);
        return;
      }
    }
  }

  // Serve static assets
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    let mimeType = MIME[ext] || 'application/octet-stream';
    if (ext === '.webp') {
      try {
        const fd = fs.openSync(filePath, 'r');
        const buf = Buffer.alloc(4);
        fs.readSync(fd, buf, 0, 4, 0);
        fs.closeSync(fd);
        if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) mimeType = 'image/png';
        else if (buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF) mimeType = 'image/jpeg';
      } catch {}
    }
    const stat = fs.statSync(filePath);
    const total = stat.size;
    const rangeHeader = req.headers.range;
    if (rangeHeader) {
      const m = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader.trim());
      if (!m) {
        res.writeHead(416, { 'Content-Range': `bytes */${total}` });
        res.end();
        return;
      }
      const start = m[1] === '' ? Math.max(0, total - Number(m[2])) : Number(m[1]);
      const end = m[2] === '' || m[1] === '' ? total - 1 : Math.min(total - 1, Number(m[2]));
      if (Number.isNaN(start) || Number.isNaN(end) || start > end || start >= total) {
        res.writeHead(416, { 'Content-Range': `bytes */${total}` });
        res.end();
        return;
      }
      const headers = {
        ...noCacheHeaders(mimeType),
        'Accept-Ranges': 'bytes',
        'Content-Range': `bytes ${start}-${end}/${total}`,
        'Content-Length': String(end - start + 1),
      };
      res.writeHead(206, headers);
      fs.createReadStream(filePath, { start, end }).pipe(res);
      return;
    }
    res.writeHead(200, {
      ...noCacheHeaders(mimeType),
      'Accept-Ranges': 'bytes',
      'Content-Length': String(total),
    });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not found: ' + reqPath);
});

server.listen(PORT, () => {
  console.log(`The Grand Lucknow local static server active at http://localhost:${PORT}`);
});
