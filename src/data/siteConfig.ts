export interface SiteConfig {
  name: string;
  address: string;
  pinCode: string;
  city: string;
  state: string;
  country: string;
  phones: string[];
  whatsappNumber: string;
  email: string;
  totalRooms: number;
  doubleRooms: number;
  familySuites: number;
  services: string[];
  SHOW_UNCONFIRMED_FACTS: boolean;
  SHOW_REVIEWS: boolean;
  analyticsProviders: string[];
}

export const siteConfig: SiteConfig = {
  name: 'The Grand Lucknow',
  address: '22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301',
  pinCode: '226301',
  city: 'Lucknow',
  state: 'Uttar Pradesh',
  country: 'India',
  phones: ['0522-2970015', '+91 91291 27091'],
  whatsappNumber: '919129127091',
  email: 'Thegrandbanquet07@gmail.com',
  totalRooms: 64,
  doubleRooms: 56,
  familySuites: 8,
  services: ['Wedding', 'Destination Wedding', 'Rooms', 'Decoration', 'Catering', 'Event Planning'],
  SHOW_UNCONFIRMED_FACTS: false,
  SHOW_REVIEWS: false,
  analyticsProviders: [] as string[],
};

export default siteConfig;
