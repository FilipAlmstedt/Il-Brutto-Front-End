import axios from "axios";
import { useEffect, useState } from "react";
import { Booking } from "../Models/Booking";
import { CustomerInfo } from "../Models/CustomerInfo";
import { AdminCalendarPlugin } from "./AdminComponents/AdminCalendarPlugin";
import { AdminGuestAmount } from "./AdminComponents/AdminGuestAmount";
import { AdminSeatingTime } from "./AdminComponents/AdminSeatingTime";
import { AdminUserForm } from "./AdminComponents/AdminUserForm";
import { v4 as uuidv4 } from "uuid";
import Moment from 'react-moment';


export const AdminPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  let defaultValues: Booking = {
    date: new Date(),
    bookingRef: "",
    guestAmount: 0,
    seatingTime: "",
    customerInfo: {
      firstName: "",
      lastName: "",
      email: "",
      tel: 123456,
      additionalInfo: "",
    },
  };
  const [booking, setBooking] = useState<Booking>(defaultValues);

  // Get chosen date from AdminCalendarPlugin component
  const getDate = (selectedDate: Date) => {
    const bookingObject = { ...booking };
    bookingObject.date = selectedDate;
    setBooking(bookingObject);
  };

  // Get seatingTime from AdminSeatingTime component // NOT DONE!!!
  const getSeatingTime = (chosenTime: string) => {
    const bookingObject = { ...booking };
    bookingObject.seatingTime = chosenTime;
    setBooking(bookingObject);
  };

  // Get the guest amount from AdminGuestAmount component
  const getGuestAmount = (selectedGuestAmount: number) => {
    const bookingObject = { ...booking };
    bookingObject.guestAmount = selectedGuestAmount;
    setBooking(bookingObject);
  };

  // Get customer information from AdminUserForm component
  const getCustomerInfo = (customerInput: CustomerInfo) => {
    const bookingObject = { ...booking };
    bookingObject.customerInfo = customerInput;

    // Create unique bookingRef
    bookingObject.bookingRef = uuidv4();

    setBooking(bookingObject);
    console.log(bookingObject);
  };

  const submitAllInfo = () => {
    axios.post<Booking>("http://localhost:8000/admin", booking);
  };

  useEffect(() => {
    axios.get<Booking[]>("http://localhost:8000/admin").then((response) => {
      setBookings(response.data);
    });
  }, []);

  let liTags = bookings.map((booking) => {
    return (
      // Unikt värde, id?
      <li key={booking.bookingRef}>
        <h3>
          {booking.customerInfo.firstName} {booking.customerInfo.lastName}
        </h3>
        <h4>Guestamount:{booking.guestAmount}</h4>
        <h4>
          Date:<Moment format="YYYY/MM/DD">{booking.date}</Moment>
        </h4>
        <h4>Seating time: {booking.seatingTime}</h4>
        <h4>Booking reference:{booking.bookingRef}</h4>

        <button>DELETE</button>
        <button>EDIT</button>
      </li>
    );
  });

  return (
    <>
      <AdminCalendarPlugin addChosenDate={getDate}></AdminCalendarPlugin>
      <AdminSeatingTime addSeatingTime={getSeatingTime}></AdminSeatingTime>
      <AdminGuestAmount addGuestAmount={getGuestAmount}></AdminGuestAmount>
      <AdminUserForm addCustomerInfo={getCustomerInfo}></AdminUserForm>
      <button onClick={submitAllInfo}> POST </button>
      <ul>{liTags}</ul>
    </>
  );
};
