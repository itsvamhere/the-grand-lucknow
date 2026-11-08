import fs from 'fs';

const subpageHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const styleTags = subpageHtml.match(/<style[\s\S]*?<\/style>/gi) || [];
styleTags.forEach((st, idx) => {
  const openTag = st.match(/<style[^>]*>/i)[0];
  console.log(`Subpage Style ${idx}: length=${st.length}, openTag=${openTag}`);
});
