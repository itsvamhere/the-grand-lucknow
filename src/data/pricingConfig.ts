import type { VenueSlug } from './venueFacts';

export const PRICING_CONFIG = {
  PRICING_CONFIRMED: false,
  TAX_RATE_CONFIRMED: false,
  tariffLabel: 'Sample tariff',
  venueDailySampleTariffINR: {
    'open-earth-lawn': 350000,
    'grassland-gala': 225000,
    'the-royal-legacy-banquet': 185000,
    'garden-galaxy': 125000,
    'the-grand-courtyard': 95000,
  } satisfies Record<VenueSlug, number>,
  venueTokenAdvanceINR: 25000,
  venueSampleGstRate: 0.18,
  venueSampleGstNote: '18% sample GST — subject to CA/SAC confirmation',
} as const;
