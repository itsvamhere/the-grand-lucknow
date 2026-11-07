import fs from 'fs';

const home = fs.readFileSync('index.html', 'utf8');
const sub = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find <footer> in index.html
const homeFooterMatch = home.match(/<footer[\s\S]*?<\/footer>/);
if (homeFooterMatch) {
  console.log('Home footer length:', homeFooterMatch[0].length);
  console.log('Home footer start:', homeFooterMatch[0].slice(0, 300));
  console.log('Home footer end:', homeFooterMatch[0].slice(-300));
}

// Find footer in open-earth-lawn.html
const subFooterMatch = sub.match(/<footer[\s\S]*?<\/footer>/);
if (subFooterMatch) {
  console.log('Subpage footer length:', subFooterMatch[0].length);
  console.log('Subpage footer start:', subFooterMatch[0].slice(0, 300));
  console.log('Subpage footer end:', subFooterMatch[0].slice(-300));
}

// Check breakpoint styles in index.html vs subpage
const homeBp = home.match(/<style data-framer-breakpoint-css>[\s\S]*?<\/style>/);
if (homeBp) {
  console.log('Home breakpoint CSS length:', homeBp[0].length);
  // look for hidden-o5o8qi, hidden-72rtr7, hidden-p8zd8m
  const classes = ['hidden-o5o8qi', 'hidden-72rtr7', 'hidden-p8zd8m'];
  classes.forEach(cls => {
    console.log(`Home contains ${cls}:`, homeBp[0].includes(cls));
  });
}

const subBp = sub.match(/<style data-framer-breakpoint-css>[\s\S]*?<\/style>/);
if (subBp) {
  console.log('Subpage breakpoint CSS length:', subBp[0].length);
  const classes = ['hidden-o5o8qi', 'hidden-72rtr7', 'hidden-p8zd8m'];
  classes.forEach(cls => {
    console.log(`Subpage contains ${cls}:`, subBp[0].includes(cls));
  });
}
