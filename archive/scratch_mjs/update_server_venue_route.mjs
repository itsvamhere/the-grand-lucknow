import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const serverPath = path.join(projectDir, 'server.mjs');
let server = fs.readFileSync(serverPath, 'utf-8');

// Insert the venue detail handler right before fallback (step 6)
const venueRouteHandler = `
  // 5.5 Handle Venue detail pages (/venues/boutique-n2, /venues/venue-n2, /apartments/boutique-n2, etc.)
  if (reqPath.startsWith('/venues/') || reqPath.startsWith('/apartments/')) {
    const venueHtmlPath = path.join(__dirname, 'venues', 'venue-n2.html');
    if (fs.existsSync(venueHtmlPath)) {
      let content = fs.readFileSync(venueHtmlPath, 'utf-8');
      content = swapText(content);
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(content);
      return;
    }
  }
`;

server = server.replace('  // 6. Fallback for client routes', venueRouteHandler + '\n  // 6. Fallback for client routes');

fs.writeFileSync(serverPath, server, 'utf-8');
console.log('✓ server.mjs updated with dedicated venue detail route handler');
