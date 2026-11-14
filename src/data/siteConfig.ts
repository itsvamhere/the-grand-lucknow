export const SITE_CONFIG = {
  name: 'The Grand Lucknow',
  wordmark: 'THE GRAND',
  tagline: 'Premier Luxury Event Estate in Lucknow',
  address: '22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301',
  phones: ['0522-2970015', '+91 91291 27091'] as const,
  primaryPhoneHref: 'tel:+919129127091',
  landlineHref: 'tel:+915222970015',
  whatsappNumber: '919129127091',
  email: 'Thegrandbanquet07@gmail.com',
  emailHref: 'mailto:Thegrandbanquet07@gmail.com',
  totalRooms: 64,
  doubleRooms: 56,
  familySuites: 8,
  services: [
    'Wedding',
    'Destination Wedding',
    'Rooms',
    'Decoration',
    'Catering',
    'Event Planning',
  ] as const,
  SHOW_UNCONFIRMED_FACTS: false,
  SHOW_REVIEWS: false,
  analyticsProviders: [] as string[],
  socials: {
    instagram: 'https://www.instagram.com/thegrand.lucknow/',
    facebook: 'https://www.facebook.com/thegrandlucknow/',
  },
  attribution: {
    label: 'Built by Edifice',
    creditText: 'Edifice — elvar.in',
    href: 'https://elvar.in/edifice',
  },
} as const;

export const NAV_LINKS = [
  { label: 'Venues', href: '/venues' },
  { label: 'Stay', href: '/book/rooms' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const MOBILE_MENU_LINKS = [
  ...NAV_LINKS,
  { label: 'Book Now', href: '/book/venue' },
] as const;
