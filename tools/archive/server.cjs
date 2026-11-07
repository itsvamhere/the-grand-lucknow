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
const s = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';
  let fp = path.join(root, urlPath);
  if (!fs.existsSync(fp)) { res.writeHead(404); res.end('Not found: ' + urlPath); return; }
  const ext = path.extname(fp).toLowerCase();
  const ct = mimeMap[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': ct, 'Cache-Control': 'no-cache, no-store' });
  fs.createReadStream(fp).pipe(res);
});
s.listen(3003, () => console.log('Server running on http://localhost:3003'));
