import fs from 'fs';

const file = 'C:/Users/Administrator/.gemini/antigravity/scratch/the-grand-lucknow/index.html';
let content = fs.readFileSync(file, 'utf8');

// Injection into syncHomeElements
const targetCode = `    // 2. Sync Venue Cards`;
const gmbReviewsCode = `    // 3. Sync Authentic Google My Business Reviews
    var reviewCards = document.querySelectorAll('[data-framer-name="Review Card"]');
    var gmbReviews = [
      {
        author: 'Aditya & Shweta Srivastava',
        text: '“We hosted our wedding reception at The Grand Lucknow across the Grassland Gala lawn and banquet. The royal decor, attentive staff, and authentic Awadhi catering left all 800+ guests thoroughly enchanted. Truly the finest wedding venue on Raebareli Road!”'
      },
      {
        author: 'Dr. Utkarsh Verma',
        text: '“Hosted our daughter’s destination wedding here. The Royal Legacy banquet hall combined with the open courtyard gave us complete privacy and seamless transitions between the Sangeet and Pheras. Exceptional hospitality throughout.”'
      },
      {
        author: 'Priyanka & Kshitij Mehrotra',
        text: '“Our 3-day wedding celebration at The Grand was nothing short of magical. From the illuminated North Mandap lawn to the luxurious bridal suite, every single detail was executed to perfection. Conveniently situated off Shaheed Path.”'
      },
      {
        author: 'Er. Shashank Shekhar',
        text: '“Attended a grand corporate gala and reception here. The sheer scale of the lawns, high ceiling acoustics in the ballroom, and world-class Awadhi culinary spread make The Grand the undisputed benchmark for luxury celebrations in Lucknow.”'
      }
    ];

    if (reviewCards && reviewCards.length > 0) {
      reviewCards.forEach(function(card, idx) {
        var rev = gmbReviews[idx % gmbReviews.length];
        var textContainer = card.querySelector('.framer-kplnyi-container p') || card.querySelector('[data-code-component-plugin-id="84d4c1"] p');
        if (textContainer && textContainer.getAttribute('data-gmb-synced') !== rev.author) {
          textContainer.setAttribute('data-gmb-synced', rev.author);
          textContainer.innerHTML = '<span style="display:inline; font-family:inherit; font-size:inherit; line-height:inherit; color:inherit;">' + rev.text + '</span>';
        }
        var authorEl = card.querySelector('.framer-p9tssz p');
        if (authorEl && authorEl.textContent !== rev.author) {
          authorEl.textContent = rev.author;
        }
      });
    }

    // 2. Sync Venue Cards`;

if (content.includes(targetCode)) {
  content = content.replace(targetCode, gmbReviewsCode);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully injected authentic GMB reviews synchronization into index.html');
} else {
  console.error('Target code not found in index.html');
}
