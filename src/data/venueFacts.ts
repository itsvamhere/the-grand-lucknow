export interface VenueFact {
  slug: string;
  name: string;
  type: 'Lawn' | 'Indoor Banquet';
  sqft: number;
  capacity: string;
  minGuests: number;
  maxGuests: number;
  tags: string[];
  description: string;
  images: string[];
}

export const VENUE_FACTS: Record<string, VenueFact> = {
  'open-earth-lawn': {
    slug: 'open-earth-lawn',
    name: 'Open Earth Lawn',
    type: 'Lawn',
    sqft: 55000,
    capacity: '1,000 - 1,500',
    minGuests: 1000,
    maxGuests: 1500,
    tags: ['Open Air Setting', 'Premium Lighting', 'Grand Celebrations'],
    description: "Lucknow's premier address for monumental open-air weddings and destination celebrations.",
    images: [
      '/images/venues/open_earth_lawn_official.webp',
      '/images/card_1_open_earth.webp',
      '/images/venues/open_earth_lawn_1.webp',
      '/images/venues/open_earth_lawn_2.webp',
    ],
  },
  'grassland-gala': {
    slug: 'grassland-gala',
    name: 'Grassland Gala',
    type: 'Lawn',
    sqft: 20000,
    capacity: '500 - 800',
    minGuests: 500,
    maxGuests: 800,
    tags: ['Manicured Lawns', 'Garden Lighting', 'Medium Events'],
    description: "A pristine manicured estate lawn designed for mid-to-large wedding ceremonies and receptions.",
    images: [
      '/images/venues/grassland_gala_official.webp',
      '/images/card_2_grassland_gala.webp',
    ],
  },
  'garden-galaxy': {
    slug: 'garden-galaxy',
    name: 'Garden Galaxy',
    type: 'Lawn',
    sqft: 15000,
    capacity: '250 - 300',
    minGuests: 250,
    maxGuests: 300,
    tags: ['Intimate Setting', 'Garden Ambiance', 'Private Events'],
    description: "An intimate garden lawn enveloped in lush foliage, ideal for private celebrations and sangeet evenings.",
    images: [
      '/images/venues/garden_galaxy_official.webp',
      '/images/card_3_ballroom.webp',
    ],
  },
  'the-grand-courtyard': {
    slug: 'the-grand-courtyard',
    name: 'The Grand Courtyard',
    type: 'Lawn',
    sqft: 15000,
    capacity: '200 - 250',
    minGuests: 200,
    maxGuests: 250,
    tags: ['Traditional Setting', 'Haldi & Mehndi Ceremony Space'],
    description: "A timeless open courtyard framed for vibrant Haldi, Mehndi, and daytime wedding rituals.",
    images: [
      '/images/venues/the_grand_courtyard_official.webp',
      '/images/card_4_courtyard.webp',
    ],
  },
  'the-royal-legacy-banquet': {
    slug: 'the-royal-legacy-banquet',
    name: 'The Royal Legacy Banquet',
    type: 'Indoor Banquet',
    sqft: 10000,
    capacity: '500 - 600',
    minGuests: 500,
    maxGuests: 600,
    tags: ['Climate Controlled', 'Premium Interiors', 'Full Service'],
    description: "Lucknow's premier address for indoor luxury banquets, combining climate-controlled grandeur with bespoke hospitality.",
    images: [
      '/images/venues/royal_legacy_banquet_official.webp',
      '/images/card_5_garden_pavilion.webp',
    ],
  },
};

export const verifiedVenueList: VenueFact[] = Object.values(VENUE_FACTS);
export default VENUE_FACTS;
