import { Booking } from "../Models/Booking";

const MockBookingArray: Booking[] = [
  {
    date: new Date(),
    bookingRef: "abc123",
    guestAmount: 2,
    seatingTime: "early",
    customerInfo: {
      firstName: "Edvin",
      lastName: "Sjögren",
      email: "esfed20s@gmail.com",
      tel: 123987,
      additionalInfo: "Nut allergy",
    },
  },
  {
    date: new Date(),
    bookingRef: "123abc",
    guestAmount: 4,
    seatingTime: "late",
    customerInfo: {
      firstName: "Filip",
      lastName: "Almstedt",
      email: "filips@gmail.com",
      tel: 123456,
      additionalInfo: "Seafood allergy",
    },
  },
  {
    date: new Date(),
    bookingRef: "a1b2c3",
    guestAmount: 6,
    seatingTime: "early",
    customerInfo: {
      firstName: "Erik",
      lastName: "Åström",
      email: "eckedevelopment@gmail.com",
      tel: 123321,
      additionalInfo: "People allergy",
    },
  },
];

export { MockBookingArray };
