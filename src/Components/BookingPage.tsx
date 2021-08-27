import { CalendarPlugin } from "./BookingComponents/CalendarPlugin";
import { BookingSummary } from "./BookingComponents/BookingSummary";
import { UserForm } from "./BookingComponents/UserForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { Booking } from "../Models/Booking";

export const BookingPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const getBookings = (chosenDate: Date, guestAmount: number) => {};

  useEffect(() => {
    axios
      .get<Booking[]>("http://localhost:8000/reservations")
      .then((response) => {
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
      {/* <UserForm></UserForm>
      <BookingSummary></BookingSummary> */}
    </>
  );
};
