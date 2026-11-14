export interface PricingConfig {
  PRICING_CONFIRMED: boolean;
  TAX_RATE_CONFIRMED: boolean;
  tariffLabel: string;
  venueDailySampleTariffINR: Record<string, number>;
  venueTokenAdvanceINR: number;
  venueSampleGstRate: number;
  sampleGstRateLabel: string;
}

export const PRICING_CONFIG: PricingConfig = {
  PRICING_CONFIRMED: false,
  TAX_RATE_CONFIRMED: false,
  tariffLabel: 'Sample tariff',
  venueDailySampleTariffINR: {
    'open-earth-lawn': 350000,
    'grassland-gala': 225000,
    'the-royal-legacy-banquet': 185000,
    'garden-galaxy': 125000,
    'the-grand-courtyard': 95000,
  },
  venueTokenAdvanceINR: 25000,
  venueSampleGstRate: 0.18,
  sampleGstRateLabel: '18% sample GST — subject to CA/SAC confirmation',
};

export default PRICING_CONFIG;
