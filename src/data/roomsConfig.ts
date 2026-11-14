export interface RoomTypeConfig {
  id: string;
  name: string;
  count: number;
  sampleMaxGuests: number;
  occupancyConfirmed: boolean;
  sampleNightlyTariffINR: number;
}

export const ROOM_TYPES: Record<string, RoomTypeConfig> = {
  'double-occupancy': {
    id: 'double-occupancy',
    name: 'Double Occupancy Room',
    count: 56,
    sampleMaxGuests: 2,
    occupancyConfirmed: false,
    sampleNightlyTariffINR: 6500,
  },
  'family-suite': {
    id: 'family-suite',
    name: 'Luxury Family Suite',
    count: 8,
    sampleMaxGuests: 4,
    occupancyConfirmed: false,
    sampleNightlyTariffINR: 14000,
  },
};

export const totalSampleRoomCapacity = 144; // 56 * 2 + 8 * 4 = 144

export const getRoomGstRate = (nightlyTariffINR: number): number =>
  nightlyTariffINR <= 1000 ? 0 : nightlyTariffINR <= 7500 ? 0.05 : 0.18;

export default {
  ROOM_TYPES,
  totalSampleRoomCapacity,
  getRoomGstRate,
};
