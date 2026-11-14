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
  '.ico': 'image/x-icon'
};

const FRAMER_UPSTREAM = 'https://framerusercontent.com/sites/1bk9uGIcxVnDnwzQnwlcko/';

function swapText(content) {
  if (typeof content !== 'string') return content;
  return content
    // Attribution
    .replaceAll('https://nexene.at/', 'https://elvar.in/edifice')
    .replaceAll('https://nexene.at', 'https://elvar.in/edifice')
    .replaceAll('Made with love by', 'Built by')
    .replaceAll('eYOd1t1bt:`Nexene`', 'eYOd1t1bt:`Edifice`')
    .replaceAll('children:`Nexene`', 'children:`Edifice`')
    .replaceAll('children:`Made with love by`', 'children:`Built by`')
    .replaceAll('children:`Design & development`', 'children:`Built by`')

    // Contact & collective voice
    .replaceAll('or your stay?', 'or your celebration?')
    .replaceAll('or your stay', 'or your celebration')
    .replaceAll('send me an email', 'send us an email')
    .replaceAll('give me a call', 'give us a call')
    .replaceAll('send me', 'send us')
    .replaceAll('give me', 'give us')
    .replaceAll("I'd be happy to help you personally", 'We would be delighted to assist you with your celebration')
    .replaceAll('I’d be happy to help you personally', 'We would be delighted to assist you with your celebration')

    // Socials: Facebook only, NO LinkedIn
    .replaceAll('https://www.linkedin.com/in/thegrand-steinlechner-045a4417b/', 'https://www.facebook.com/thegrandlucknow/')
    .replaceAll('https://www.linkedin.com/in/thegrand-steinlechner-045a4417b', 'https://www.facebook.com/thegrandlucknow/')
    .replaceAll('https://www.linkedin.com/in/moritz-steinlechner-045a4417b/', 'https://www.facebook.com/thegrandlucknow/')
    .replaceAll('https://www.linkedin.com/in/moritz-steinlechner-045a4417b', 'https://www.facebook.com/thegrandlucknow/')
    .replaceAll('eYOd1t1bt:`LinkedIn`', 'eYOd1t1bt:`Facebook`')
    .replaceAll('>LinkedIn<', '>Facebook<')

    // Venue Names (Named specifically instead of N1, N2, etc.)
    .replaceAll('Boutique N°1', 'Open Earth Lawn')
    .replaceAll('Venue N°1', 'Open Earth Lawn')
    .replaceAll('Boutique N°2', 'Grassland Gala')
    .replaceAll('Venue N°2', 'Grassland Gala')
    .replaceAll('Boutique N°3', 'Garden Galaxy')
    .replaceAll('Venue N°3', 'Garden Galaxy')
    .replaceAll('Boutique N°4', 'The Royal Legacy Banquet')
    .replaceAll('Venue N°4', 'The Royal Legacy Banquet')
    .replaceAll('Loft N°1', 'Garden Pavilion')
    .replaceAll('Venue N°5', 'Garden Pavilion')
    .replaceAll('Loft N°2', 'The Royal Mandap')
    .replaceAll('Venue N°6', 'The Royal Mandap')
    .replaceAll('Loft N°3', 'The Dining Expanse')
    .replaceAll('Venue N°7', 'The Dining Expanse')
    .replaceAll('Garden N°1', 'VIP Atrium')
    .replaceAll('Venue N°8', 'VIP Atrium')
    .replaceAll('Urban N°1', 'Presidential Suite')
    .replaceAll('Venue N°9', 'Presidential Suite')

    // Cursor: strictly "Details ↗"
    .replaceAll('label:`Venue Details`', 'label:`Details`')
    .replaceAll('label:`Apartment Details`', 'label:`Details`')
    .replaceAll('text:`Venue Details`', 'text:`Details`')
    .replaceAll('text:`Apartment Details`', 'text:`Details`')
    .replaceAll('Apartment Details ↗', 'Details ↗')
    .replaceAll('Venue Details ↗', 'Details ↗')
    .replaceAll('Apartment Details', 'Details')
    .replaceAll('Venue Details', 'Details')
    .replaceAll('Apartment Size', 'Venue Scale')
    .replaceAll('Apartment size', 'Venue scale')
    .replaceAll('45 m²', '20,000 sq ft')
    .replaceAll('45&nbsp;m²', '20,000 sq ft')
    .replaceAll('20,000 sq ft sq ft', '20,000 sq ft')
    .replaceAll('>m²<', '>sq ft<')
    .replaceAll('>m²</span>', '>sq ft</span>')
    .replaceAll('m²', 'sq ft')

    // Philosophy & About
    .replaceAll('My Philosophy', 'Our Vision')
    .replaceAll('a temporary home deserves just as much care as your own home.', 'every celebration deserves a setting as grand as your vision.')
    .replaceAll('a temporary home deserves as much care as your own.', 'every celebration deserves a setting as grand as your vision.')
    .replaceAll("Hi, I'm Moritz", "Architectural Poise & Estate Hospitality")
    .replaceAll('I believe', 'We believe')

    // Address & Entity from thegrandlucknow.in
    .replaceAll('Schönaugasse 76, 8010 Lucknow, India', '22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301, India')
    .replaceAll('Moritz Steinlechner, The Grand', 'The Grand (Banquet & Event Estate)')
    .replaceAll('Moritz Steinlechner', 'The Grand')
    .replaceAll('office@casamomo.at', 'office@thegrandlucknow.in')
    .replaceAll('events@thegrandlucknow.in', 'Thegrandbanquet07@gmail.com')
    .replaceAll('+43 664 1999605', '+91 91291 27091')

    // Map Landmarks (Lucknow Context on Casa Momo layout)
    .replaceAll('Main Square', 'Shaheed Path')
    .replaceAll('Schlossberg', 'Gomti Riverfront')
    .replaceAll('Schloßberg', 'Gomti Riverfront')
    .replaceAll('Mur Island', 'Raibareli Road')
    .replaceAll('Stadtpark', 'Bindaua Estate')
    .replaceAll('Lendplatz', 'SGPGI Hub')
    .replaceAll('Opera', 'Mohanlalganj')
    .replaceAll('Jakominiplatz', 'Hazratganj')
    .replaceAll('Kunsthaus', 'Charbagh')
    .replaceAll('Main Station', 'Amar Shaheed Path')
    .replaceAll('Volksgarten', 'Kisan Path')
    .replaceAll('Augarten', 'Alambagh')

    // Brand and Paths
    .replaceAll('https://framerusercontent.com/sites/1bk9uGIcxVnDnwzQnwlcko/', '/scripts/')
    .replaceAll('https://www.casamomo.at', 'https://www.thegrandlucknow.in')
    .replaceAll('casamomo.at', 'thegrandlucknow.in')
    .replaceAll('Casa Momo', 'The Grand')
    .replaceAll('THE GRAND LUCKNOW', 'THE GRAND')
    .replaceAll('The Grand Lucknow', 'The Grand');
}

const server = http.createServer(async (req, res) => {
  let cleanUrl = req.url.split('?')[0];
  if (cleanUrl.includes('&scale-down-to=')) {
    cleanUrl = cleanUrl.split('&scale-down-to=')[0];
  }
  let reqPath = decodeURI(cleanUrl).replace(/\/+$/, '');
  if (reqPath === '') reqPath = '/index.html';
  if (reqPath === '/apartments') reqPath = '/venues.html';
  if (reqPath === '/book') reqPath = '/book/venue.html';

  const filePath = path.join(__dirname, reqPath.replace(/^\//, ''));

  // 1. If HTML requested (or clean URL with existing .html file), read, process with swapText, and return
  let candidateHtml = filePath;
  if (!candidateHtml.endsWith('.html') && fs.existsSync(candidateHtml + '.html')) {
    candidateHtml = candidateHtml + '.html';
  }
  if (candidateHtml.endsWith('.html') && fs.existsSync(candidateHtml)) {
    let content = fs.readFileSync(candidateHtml, 'utf-8');
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

  // 2. Serve local scripts with dynamic swapText
  if ((reqPath.endsWith('.mjs') || reqPath.endsWith('.js')) && fs.existsSync(filePath)) {
    let text = fs.readFileSync(filePath, 'utf-8');
    text = swapText(text);
    res.writeHead(200, {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(text);
    return;
  }

  // 3. Serve other local files if exist
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    let mimeType = MIME[ext] || 'application/octet-stream';
    if (ext === '.webp') {
      try {
        const fd = fs.openSync(filePath, 'r');
        const buf = Buffer.alloc(4);
        fs.readSync(fd, buf, 0, 4, 0);
        fs.closeSync(fd);
        if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) {
          mimeType = 'image/png';
        } else if (buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF) {
          mimeType = 'image/jpeg';
        }
      } catch (e) {}
    }
    res.writeHead(200, {
      'Content-Type': mimeType,
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  // 4. Missing script -> fetch from upstream and apply swapText
  if (reqPath.endsWith('.mjs') || reqPath.endsWith('.js')) {
    const filename = path.basename(reqPath);
    const upstreamUrl = FRAMER_UPSTREAM + filename;
    try {
      const upRes = await fetch(upstreamUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (upRes.ok) {
        let text = await upRes.text();
        text = swapText(text);

        const localScriptPath = path.join(__dirname, 'scripts', filename);
        fs.mkdirSync(path.dirname(localScriptPath), { recursive: true });
        fs.writeFileSync(localScriptPath, text, 'utf-8');

        res.writeHead(200, {
          'Content-Type': 'application/javascript; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(text);
        return;
      }
    } catch (err) {
      console.error(`Error proxying script ${upstreamUrl}:`, err.message);
    }
  }

  // 5. Missing image -> 404
  if (reqPath.startsWith('/images/') || reqPath.endsWith('.webp') || reqPath.endsWith('.png') || reqPath.endsWith('.svg') || reqPath.endsWith('.jpg')) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Image not found: ' + reqPath);
    return;
  }


  // 5.5 Handle Venue detail pages (/venues/venue-n1..n5, /apartments/boutique-n1..n4, /apartments/loft-n1, etc.)
  if (reqPath.startsWith('/venues/') || reqPath.startsWith('/apartments/')) {
    const slug = reqPath.replace(/^\/(?:venues|apartments)\//, '').replace(/\/$/, '').replace(/\.html$/, '');
    if (slug) {
      let venueHtmlPath = path.join(__dirname, 'venues', `${slug}.html`);
      // If exact slug file not found, try aliases
      if (!fs.existsSync(venueHtmlPath)) {
        if (slug === 'boutique-n1' || slug === 'venue-n1' || slug === '1') venueHtmlPath = path.join(__dirname, 'venues', 'venue-n1.html');
        else if (slug === 'boutique-n2' || slug === 'venue-n2' || slug === '2' || slug === 'grassland-gala') venueHtmlPath = path.join(__dirname, 'venues', 'venue-n2.html');
        else if (slug === 'boutique-n3' || slug === 'venue-n3' || slug === '3' || slug === 'garden-galaxy') venueHtmlPath = path.join(__dirname, 'venues', 'venue-n3.html');
        else if (slug === 'boutique-n4' || slug === 'venue-n4' || slug === '4') venueHtmlPath = path.join(__dirname, 'venues', 'venue-n4.html');
        else if (slug === 'loft-n1' || slug === 'venue-n5' || slug === 'boutique-n5' || slug === '5') venueHtmlPath = path.join(__dirname, 'venues', 'venue-n5.html');
      }

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
  }

  // 6. 404 for unknown routes
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not found: ' + reqPath);
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`The Grand (Live Server Active)`);
  console.log(`Running at: http://localhost:${PORT}`);
  console.log(`======================================================\n`);
});
