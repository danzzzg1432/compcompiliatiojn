///////////////////////////////////////////////////////////////////////////////
// Types
///////////////////////////////////////////////////////////////////////////////

type Campus = 'Sydney' | 'Canberra';
type MembershipTier = 'Standard' | 'Gold' | 'VIP';
type MerchandiseItem = 'Hoodie' | 'Cap' | 'AlumniPin' | 'Yearbook';

export interface AlumniFestivalBooking {
  bookingId: number;
  bookingConfirmed: boolean;

  attendee: {
    fullName: string;
    graduationYear: number;
    membershipTier: MembershipTier;
  };

  festivalAccess: {
    campus: Campus;
    galaDinner: boolean;
    networkingEvent: boolean;
    vipLounge: boolean;
  };

  guests: {
    adults: number;
    children: number;
  };

  purchases: {
    photographyPackage: boolean;
    merchandise: MerchandiseItem[];
    donationAmount: number;
  };
}

///////////////////////////////////////////////////////////////////////////////
// Helper Types
///////////////////////////////////////////////////////////////////////////////

interface GuestCount {
  sydney: number;
  canberra: number;
}

interface RevenueByMembershipTier {
  standard: number;
  gold: number;
  vip: number;
}

///////////////////////////////////////////////////////////////////////////////
// Sample Booking Data
///////////////////////////////////////////////////////////////////////////////

const bookings: AlumniFestivalBooking[] = [
  {
    bookingId: 2001,
    bookingConfirmed: true,

    attendee: {
      fullName: 'Alice Bush',
      graduationYear: 2022,
      membershipTier: 'Standard',
    },

    festivalAccess: {
      campus: 'Sydney',
      galaDinner: true,
      networkingEvent: true,
      vipLounge: false
    },

    guests: {
      adults: 2,
      children: 1
    },

    purchases: {
      photographyPackage: true,
      merchandise: ['Hoodie', 'Cap'],
      donationAmount: 50
    }
  },
];

///////////////////////////////////////////////////////////////////////////////
// Functions to Implement
///////////////////////////////////////////////////////////////////////////////

/**
 * Total number of guests attending at each campus.
 *
 * @param {AlumniFestivalBooking[]} bookings
 * @returns {GuestCount}
 */
export function totalGuests( bookings: AlumniFestivalBooking[] ): GuestCount {
  // TODO: complete me
  return { sydney: -1, canberra: -1 };
}

/**
 * Total festival revenue grouped by membership tier.
 *
 * @param {AlumniFestivalBooking[]} bookings
 * @returns {RevenueByMembershipTier}
 */
export function totalRevenueByMembershipTier(bookings: AlumniFestivalBooking[]): RevenueByMembershipTier {
  // TODO: complete me
  return { standard: -1, gold: -1, vip: -1 };
}
