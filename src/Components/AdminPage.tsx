import axios from "axios";
import { useEffect, useState } from "react";
import { Booking } from "../Models/Booking";
import { CustomerInfo } from "../Models/CustomerInfo";
import { CalendarPlugin } from "./BookingComponents/CalendarPlugin";
import { UserForm } from "./BookingComponents/UserForm";

export const AdminPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const getBookings = (chosenDate: Date, guestAmount: number) => {};

  const addBooking = (
    date: Date,
    bookingRef: string,
    guestAmount: number,
    seatingTime: string,
    firstName: string,
    lastName: string,
    email: string,
    tel: number,
    additionalInfo: string
  ) => {
    let customerInfo = new CustomerInfo(
      firstName,
      lastName,
      email,
      tel,
      additionalInfo
    );
    
    let b = new Booking(new Date(), "ABC123", 0, "early", customerInfo);

    console.log(b);
    axios.post<Booking>("http://localhost:8000/admin", b);
  };

  useEffect(() => {
    axios.get<Booking[]>("http://localhost:8000/admin").then((response) => {
      console.log(response.data);
      setBookings(response.data);
    });
  }, []);

  let liTags = bookings.map((booking) => {
    return (
      <li key={booking.bookingRef}>
        <h1>{booking.seatingTime}</h1>
      </li>
    );
  });

  return (
    <>
      <CalendarPlugin getUserInput={getBookings}></CalendarPlugin>
      <ul>{liTags}</ul>
      <UserForm addFormInput={addBooking}></UserForm>
    </>
  );
};
