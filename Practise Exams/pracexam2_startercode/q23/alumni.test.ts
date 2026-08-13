import { describe, test, expect } from 'vitest';
import {
  AlumniFestivalBooking,
  totalGuests,
  totalRevenueByMembershipTier,
} from './alumni';

const basicBooking: AlumniFestivalBooking = {
  bookingId: 1,
  bookingConfirmed: true,

  attendee: {
    fullName: 'Alice Smith',
    graduationYear: 2022,
    membershipTier: 'Standard',
  },

  festivalAccess: {
    campus: 'Sydney',
    galaDinner: false,
    networkingEvent: false,
    vipLounge: false,
  },

  guests: {
    adults: 0,
    children: 0,
  },

  purchases: {
    photographyPackage: false,
    merchandise: [],
    donationAmount: 0,
  }
};

describe('totalGuests', () => {
  test('no guests', () => {
    expect(totalGuests([
      { ...basicBooking, bookingId: 1 },
      { ...basicBooking, bookingId: 2, bookingConfirmed: false },
    ])).toStrictEqual({ sydney: 0, canberra: 0 });
  });

  test('simple guests', () => {
    expect(totalGuests([
      {
        ...basicBooking,
        festivalAccess: {
          ...basicBooking.festivalAccess,
          campus: 'Sydney'
        },
        guests: {
          adults: 2,
          children: 1
        }
      },
      {
        ...basicBooking,
        bookingId: 2,
        festivalAccess: {
          ...basicBooking.festivalAccess,
          campus: 'Canberra'
        },
        guests: {
          adults: 1,
          children: 1
        }
      }
    ])).toStrictEqual({ sydney: 3, canberra: 2 });
  });

  test('ignore unconfirmed bookings', () => {
    expect(totalGuests([
      {
        ...basicBooking,
        festivalAccess: {
          ...basicBooking.festivalAccess,
          campus: 'Sydney'
        },
        guests: {
          adults: 4,
          children: 2
        }
      },
      {
        ...basicBooking,
        bookingConfirmed: false,
        bookingId: 2,
        festivalAccess: {
          ...basicBooking.festivalAccess,
          campus: 'Canberra'
        },
        guests: {
          adults: 10,
          children: 5
        }
      },
      {
        ...basicBooking,
        bookingId: 2,
        festivalAccess: {
          ...basicBooking.festivalAccess,
          campus: 'Canberra'
        },
        guests: {
          adults: 3,
          children: 4
        }
      }
    ])).toStrictEqual({ sydney: 6, canberra: 7 });
  });
});

describe('totalRevenueByMembershipTier', () => {
  test('single standard membership tier', () => {
    expect(totalRevenueByMembershipTier([
      {
        bookingId: 1,
        bookingConfirmed: true,

        attendee: {
          ...basicBooking.attendee,
          membershipTier: 'Standard',
        },

        festivalAccess: {
          campus: 'Sydney',
          galaDinner: false,
          networkingEvent: false,
          vipLounge: false,
        },

        guests: {
          adults: 0,
          children: 0,
        },

        purchases: {
          photographyPackage: false,
          merchandise: [],
          donationAmount: 0,
        }
      }
    ])).toStrictEqual({
      standard: 120,
      gold: 0,
      vip: 0
    });
  });

  test('multiple membership tiers', () => {
    expect(totalRevenueByMembershipTier([
      {
        bookingId: 1,
        bookingConfirmed: true,

        attendee: {
          ...basicBooking.attendee,
          membershipTier: 'Standard',
        },

        festivalAccess: {
          campus: 'Sydney',
          galaDinner: false,
          networkingEvent: false,
          vipLounge: false,
        },

        guests: {
          adults: 0,
          children: 0,
        },

        purchases: {
          photographyPackage: false,
          merchandise: [],
          donationAmount: 0,
        }
      },

      {
        bookingId: 2,
        bookingConfirmed: true,

        attendee: {
          ...basicBooking.attendee,
          membershipTier: 'Gold',
        },

        festivalAccess: {
          campus: 'Sydney',
          galaDinner: true,
          networkingEvent: true,
          vipLounge: false,
        },

        guests: {
          adults: 1,
          children: 0,
        },

        purchases: {
          photographyPackage: false,
          merchandise: [],
          donationAmount: 0,
        }
      },

      {
        bookingId: 3,
        bookingConfirmed: true,

        attendee: {
          ...basicBooking.attendee,
          membershipTier: 'VIP',
        },

        festivalAccess: {
          campus: 'Canberra',
          galaDinner: true,
          networkingEvent: true,
          vipLounge: true,
        },

        guests: {
          adults: 2,
          children: 0,
        },

        purchases: {
          photographyPackage: true,
          merchandise: ['Hoodie', 'Cap'],
          donationAmount: 100,
        }
      }
    ])).toStrictEqual({
      standard: 120,
      gold: 345,
      vip: 805,
    });
  });

  test('ignore unconfirmed bookings', () => {
    expect(totalRevenueByMembershipTier([
      {
        bookingId: 1,
        bookingConfirmed: false,

        attendee: {
          ...basicBooking.attendee,
          membershipTier: 'VIP',
        },

        festivalAccess: {
          campus: 'Sydney',
          galaDinner: true,
          networkingEvent: true,
          vipLounge: true,
        },

        guests: {
          adults: 2,
          children: 2,
        },

        purchases: {
          photographyPackage: true,
          merchandise: ['AlumniPin'],
          donationAmount: 300,
        }
      },
      {
        bookingId: 1,
        bookingConfirmed: true,

        attendee: {
          ...basicBooking.attendee,
          membershipTier: 'Gold',
        },

        festivalAccess: {
          campus: 'Sydney',
          galaDinner: true,
          networkingEvent: false,
          vipLounge: false,
        },

        guests: {
          adults: 1,
          children: 0,
        },

        purchases: {
          photographyPackage: false,
          merchandise: ['Yearbook'],
          donationAmount: 200,
        }
      },
      {
        bookingId: 2,
        bookingConfirmed: true,

        attendee: {
          ...basicBooking.attendee,
          membershipTier: 'Standard',
        },

        festivalAccess: {
          campus: 'Sydney',
          galaDinner: false,
          networkingEvent: false,
          vipLounge: false,
        },

        guests: {
          adults: 0,
          children: 0,
        },

        purchases: {
          photographyPackage: false,
          merchandise: [],
          donationAmount: 100,
        }
      }
    ])).toStrictEqual({
      standard: 220,
      gold: 545,
      vip: 0,
    });
  });
});