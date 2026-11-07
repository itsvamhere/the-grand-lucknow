import fs from 'fs';

const filePath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html';
let html = fs.readFileSync(filePath, 'utf8');

const targetMarker = '.logo-light-text [data-framer-name="Logo"] path,';
if (!html.includes(targetMarker)) {
  console.error('Target marker not found!');
  process.exit(1);
}

const cssToInject = `
/* ========================================================
   TASK 2: HERO SUBTITLE CONTRAST TREATMENT (#1A241E WRAPPER)
   ======================================================== */
.framer-1o6x5q9-container {
  background-color: rgba(26, 36, 30, 0.88) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border-radius: 6px !important;
  padding: 12px 18px !important;
  margin-left: -18px !important;
  box-sizing: border-box !important;
  width: fit-content !important;
  max-width: calc(100% + 36px) !important;
  border: 1px solid rgba(255, 240, 202, 0.15) !important;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 240, 202, 0.08) !important;
}

.framer-1o6x5q9-container p {
  color: #FFF0CA !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;
}

@media (max-width: 809.98px) {
  .framer-1o6x5q9-container {
    padding: 10px 14px !important;
    margin-left: -14px !important;
    max-width: calc(100% + 28px) !important;
  }
}
`;

// Inject before targetMarker
html = html.replace(targetMarker, cssToInject + '\n' + targetMarker);

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully updated index.html with Task 2 contrast styling!');
