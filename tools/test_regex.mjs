import fs from 'fs';

const h = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const sizeMatches = [...h.matchAll(/(rotate\(8deg\)">)(?:25,000|55,000)(<\/span><\/span> <!-- --> <span style="display:inline-flex;overflow:hidden;padding-top:0;margin-top:0;padding-left:0.06em;padding-right:0.06em;margin-left:-0.06em;margin-right:-0.06em;padding-bottom:4px;margin-bottom:-4px"><span style="display:inline-block;transform-origin:50% 100%;will-change:transform;opacity:1;transform:translateY\(100px\) rotate\(8deg\)">Sqft<\/span>)/g)];
console.log('Size regex match count:', sizeMatches.length);

const capMatches = [...h.matchAll(/(rotate\(8deg\)">)(?:2,500|1,500)(<\/span><\/span> <\/p><\/div>)/g)];
console.log('Capacity regex match count:', capMatches.length);
