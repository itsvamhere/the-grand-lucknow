export type RoomSlug = 'double-occupancy' | 'family-suite';

export interface RoomTier {
  slug: RoomSlug;
  name: string;
  count: number;
  sampleMaxGuests: number;
  occupancyConfirmed: boolean;
  sampleNightlyTariffINR: number;
  description: string;
  images: { src: string; alt: string }[];
}

export const ROOM_TIERS: RoomTier[] = [
  {
    slug: 'double-occupancy',
    name: 'Double Occupancy Room',
    count: 56,
    sampleMaxGuests: 2,
    occupancyConfirmed: false,
    sampleNightlyTariffINR: 6500,
    description:
      'Appointed estate guest rooms crafted for wedding families and outstation guests attending celebrations at The Grand Lucknow.',
    images: [
      {
        src: '/images/card_9_vip_suite.webp',
        alt: 'Double Occupancy Room interior at The Grand Lucknow',
      },
      {
        src: '/images/prefooter_1.webp',
        alt: 'Estate hospitality details and guest accommodation atmosphere',
      },
    ],
  },
  {
    slug: 'family-suite',
    name: 'Luxury Family Suite',
    count: 8,
    sampleMaxGuests: 4,
    occupancyConfirmed: false,
    sampleNightlyTariffINR: 14000,
    description:
      'Spacious suite accommodation designed for immediate wedding hosts and extended family stays on the estate.',
    images: [
      {
        src: '/images/prefooter_2.webp',
        alt: 'Luxury Family Suite sanctuary at The Grand Lucknow',
      },
      {
        src: '/images/card_9_vip_suite.webp',
        alt: 'Luxury Family Suite bedroom and lounge details',
      },
    ],
  },
];

export const ROOMS_BY_SLUG: Record<RoomSlug, RoomTier> = {
  'double-occupancy': ROOM_TIERS[0],
  'family-suite': ROOM_TIERS[1],
};

/** 56 * 2 + 8 * 4 = 144 guests across all 64 rooms */
export const totalSampleRoomCapacity = ROOM_TIERS.reduce(
  (sum, tier) => sum + tier.count * tier.sampleMaxGuests,
  0
);

export const totalRoomCount = ROOM_TIERS.reduce((sum, tier) => sum + tier.count, 0);

export const getRoomGstRate = (nightlyTariffINR: number): number =>
  nightlyTariffINR <= 1000 ? 0 : nightlyTariffINR <= 7500 ? 0.05 : 0.18;
