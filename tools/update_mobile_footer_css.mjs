import fs from 'fs';

let lawn = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Hide .casa-skip unless focused
if (!lawn.includes('.casa-skip:not(:focus)')) {
  lawn = lawn.replace(
    '</style>',
    `
  .casa-skip:not(:focus) {
    position: absolute !important;
    left: -9999px !important;
    width: 1px !important;
    height: 1px !important;
    overflow: hidden !important;
  }
</style>`
  );
}

// Add mobile wrapping for footer columns
const mobileColRule = `
@media (max-width: 809.98px) {
  footer.framer-18na9ah .framer-1h4yz5c {
    flex-direction: column !important;
    gap: 36px !important;
    width: 100% !important;
  }
  footer.framer-18na9ah .framer-1bl146l {
    display: flex !important;
    justify-content: space-between !important;
    width: 100% !important;
    gap: 20px !important;
  }
  footer.framer-18na9ah .framer-1h0qpni,
  footer.framer-18na9ah .framer-1fp396q {
    width: auto !important;
    flex: 1 !important;
  }
  footer.framer-18na9ah .framer-vwpsk8 {
    width: 100% !important;
  }
}
`;

if (!lawn.includes('footer.framer-18na9ah .framer-1h4yz5c')) {
  lawn = lawn.replace(
    '</style>',
    `${mobileColRule}\n</style>`
  );
}

fs.writeFileSync('venues/open-earth-lawn.html', lawn, 'utf8');
console.log('Added responsive mobile column rules and hidden skip link!');
