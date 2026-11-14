export type VenueSlug =
  | 'open-earth-lawn'
  | 'grassland-gala'
  | 'garden-galaxy'
  | 'the-grand-courtyard'
  | 'the-royal-legacy-banquet';

export type VenueType = 'Lawn' | 'Indoor Banquet';

export interface VenueGalleryItem {
  src: string;
  alt: string;
  label: string;
}

export interface VenueFact {
  slug: VenueSlug;
  name: string;
  type: VenueType;
  sqft: number;
  sqftDisplay: string;
  areaNote?: string;
  minGuests: number;
  maxGuests: number;
  guestsDisplay: string;
  tags: string[];
  description: string;
  image: string;
  imageAlt: string;
  gallery: VenueGalleryItem[];
}

export const VENUES: VenueFact[] = [
  {
    slug: 'open-earth-lawn',
    name: 'Open Earth Lawn',
    type: 'Lawn',
    sqft: 55000,
    sqftDisplay: '55,000',
    areaNote: 'two phases combined',
    minGuests: 1000,
    maxGuests: 1500,
    guestsDisplay: '1,000 - 1,500',
    tags: ['Open Air Setting', 'Premium Lighting', 'Grand Celebrations'],
    description:
      'Spanning 55,000 square feet across two combined phases of manicured, open-sky greens, Open Earth Lawn is the signature outdoor celebration stage at The Grand Lucknow for 1,000 to 1,500 guests.',
    image: '/images/venues/open_earth_lawn_official.webp',
    imageAlt: 'Open Earth Lawn at The Grand Lucknow with expansive manicured greens and architectural lighting',
    gallery: [
      {
        src: '/images/venues/open_earth_lawn_official.webp',
        alt: 'Open Earth Lawn illuminated for evening wedding celebrations at The Grand Lucknow',
        label: 'Open Earth Lawn — Main Grounds',
      },
      {
        src: '/images/venues/open_earth_lawn_1.webp',
        alt: 'Grand open-air wedding reception layout across Open Earth Lawn',
        label: 'Open Earth Lawn — Evening Reception Stage',
      },
      {
        src: '/images/venues/open_earth_lawn_2.webp',
        alt: 'Landscaped lawn seating and lighting arrangement at Open Earth Lawn',
        label: 'Open Earth Lawn — Phase I Pavilion',
      },
      {
        src: '/images/venues/open_earth_lawn_3.webp',
        alt: 'Floral mandap and aisle perspective on Open Earth Lawn',
        label: 'Open Earth Lawn — Ceremonial Aisle',
      },
      {
        src: '/images/venues/open_earth_lawn_4.webp',
        alt: 'Panoramic evening hospitality setup on Open Earth Lawn',
        label: 'Open Earth Lawn — Gala Dining Grounds',
      },
      {
        src: '/images/venues/open_earth_lawn_5.webp',
        alt: 'Ambient architectural illumination across the manicured lawn',
        label: 'Open Earth Lawn — Architectural Lighting',
      },
      {
        src: '/images/venues/open_earth_lawn_6.webp',
        alt: 'Wide celebration view across the two-phase Open Earth Lawn',
        label: 'Open Earth Lawn — Full Estate Panorama',
      },
    ],
  },
  {
    slug: 'grassland-gala',
    name: 'Grassland Gala',
    type: 'Lawn',
    sqft: 20000,
    sqftDisplay: '20,000',
    minGuests: 500,
    maxGuests: 800,
    guestsDisplay: '500 - 800',
    tags: ['Manicured Lawns', 'Garden Lighting', 'Medium Events'],
    description:
      'A 20,000 square foot celebration lawn designed for medium-to-large weddings, receptions, and cocktail evenings for 500 to 800 guests, featuring manicured green expanses and ambient garden lighting.',
    image: '/images/venues/grassland_gala_official.webp',
    imageAlt: 'Grassland Gala celebration lawn at The Grand Lucknow with illuminated garden perimeter',
    gallery: [
      {
        src: '/images/venues/grassland_gala_official.webp',
        alt: 'Grassland Gala open-air wedding lawn at The Grand Lucknow',
        label: 'Grassland Gala — Main Celebration Lawn',
      },
      {
        src: '/images/card_6_mandap_lawn.webp',
        alt: 'Outdoor mandap setup on manicured garden lawns at The Grand Lucknow',
        label: 'Grassland Gala — Mandap & Stage Canvas',
      },
      {
        src: '/images/card_7_dining_expanse.webp',
        alt: 'Evening banquet dining and garden hospitality layout',
        label: 'Grassland Gala — Outdoor Hospitality Expanse',
      },
    ],
  },
  {
    slug: 'garden-galaxy',
    name: 'Garden Galaxy',
    type: 'Lawn',
    sqft: 15000,
    sqftDisplay: '15,000',
    minGuests: 250,
    maxGuests: 300,
    guestsDisplay: '250 - 300',
    tags: ['Intimate Setting', 'Garden Ambiance', 'Private Events'],
    description:
      'An intimate 15,000 square foot outdoor lawn venue suited for private celebrations, engagement evenings, and pre-wedding functions welcoming 250 to 300 guests amid curated garden ambiance.',
    image: '/images/venues/garden_galaxy_official.webp',
    imageAlt: 'Garden Galaxy private event lawn at The Grand Lucknow',
    gallery: [
      {
        src: '/images/venues/garden_galaxy_official.webp',
        alt: 'Garden Galaxy illuminated open-air celebration garden at The Grand Lucknow',
        label: 'Garden Galaxy — Evening Garden Canvas',
      },
      {
        src: '/images/craft_feature_1.webp',
        alt: 'Garden floral and lighting styling for private celebrations',
        label: 'Garden Galaxy — Private Gathering Setup',
      },
    ],
  },
  {
    slug: 'the-grand-courtyard',
    name: 'The Grand Courtyard',
    type: 'Lawn',
    sqft: 15000,
    sqftDisplay: '15,000',
    minGuests: 200,
    maxGuests: 250,
    guestsDisplay: '200 - 250',
    tags: ['Traditional Setting', 'Haldi & Mehndi Ceremony Space'],
    description:
      'A 15,000 square foot open-air courtyard crafted for traditional daytime and twilight rituals including Haldi, Mehndi, and intimate family ceremonies for 200 to 250 guests.',
    image: '/images/venues/the_grand_courtyard_official.webp',
    imageAlt: 'The Grand Courtyard at The Grand Lucknow framed for Haldi and Mehndi ceremonies',
    gallery: [
      {
        src: '/images/venues/the_grand_courtyard_official.webp',
        alt: 'The Grand Courtyard ceremonial space at The Grand Lucknow',
        label: 'The Grand Courtyard — Ceremonial Grounds',
      },
      {
        src: '/images/card_8_courtyard_day.webp',
        alt: 'Daylight courtyard view prepared for Haldi and Mehndi rituals',
        label: 'The Grand Courtyard — Daylight Ritual Setting',
      },
    ],
  },
  {
    slug: 'the-royal-legacy-banquet',
    name: 'The Royal Legacy Banquet',
    type: 'Indoor Banquet',
    sqft: 10000,
    sqftDisplay: '10,000',
    minGuests: 500,
    maxGuests: 600,
    guestsDisplay: '500 - 600',
    tags: ['Climate Controlled', 'Premium Interiors', 'Full Service'],
    description:
      "A 10,000 square foot climate-controlled indoor banquet hall featuring soaring ceilings, crystal chandeliers, and full-service hospitality. The Royal Legacy Banquet is Lucknow's premier address for regal indoor weddings, corporate summits, and prestigious galas for 500 to 600 guests.",
    image: '/images/venues/royal_legacy_banquet_official.webp',
    imageAlt: 'The Royal Legacy Banquet climate-controlled indoor banquet hall at The Grand Lucknow',
    gallery: [
      {
        src: '/images/venues/royal_legacy_banquet_official.webp',
        alt: 'The Royal Legacy Banquet indoor hall with chandeliers and royal seating',
        label: 'The Royal Legacy Banquet — Grand Hall',
      },
      {
        src: '/images/craft_feature_2.webp',
        alt: 'Interior architectural detailing inside The Royal Legacy Banquet',
        label: 'The Royal Legacy Banquet — Chandelier Interiors',
      },
    ],
  },
];

export const VENUE_ALIASES: Record<string, VenueSlug> = {
  'open-earth-lawn': 'open-earth-lawn',
  'venue-n1': 'open-earth-lawn',
  'boutique-n1': 'open-earth-lawn',
  'grassland-gala': 'grassland-gala',
  'venue-n2': 'grassland-gala',
  'boutique-n2': 'grassland-gala',
  'garden-galaxy': 'garden-galaxy',
  'venue-n3': 'garden-galaxy',
  'boutique-n3': 'garden-galaxy',
  'the-grand-courtyard': 'the-grand-courtyard',
  'the-courtyard': 'the-grand-courtyard',
  'venue-n4': 'the-grand-courtyard',
  'boutique-n4': 'the-grand-courtyard',
  'the-royal-legacy-banquet': 'the-royal-legacy-banquet',
  'royal-legacy-banquet': 'the-royal-legacy-banquet',
  'grand-ballroom': 'the-royal-legacy-banquet',
  'venue-n5': 'the-royal-legacy-banquet',
  'loft-n1': 'the-royal-legacy-banquet',
  'boutique-n5': 'the-royal-legacy-banquet',
};

export function getVenueBySlug(slug: string): VenueFact | undefined {
  const canonical = VENUE_ALIASES[slug] ?? slug;
  return VENUES.find((v) => v.slug === canonical);
}
