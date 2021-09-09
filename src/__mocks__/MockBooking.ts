import { Booking } from "../Models/Booking";
import { CustomerInfo } from "../Models/CustomerInfo";

const MockBooking: Booking = {
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
};

const MockCustomerInfo: CustomerInfo = {
  firstName: "",
  lastName: "",
  email: "",
  tel: 123,
  additionalInfo: ""
}

export { MockBooking, MockCustomerInfo }
