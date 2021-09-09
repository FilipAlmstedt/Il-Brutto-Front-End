import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Booking } from "../../Models/Booking";
import { BookingSummary } from "../BookingComponents/BookingSummary";

interface IParams {
  id: string;
}

export const ConfirmationPage = () => {
  let { id } = useParams<IParams>();

  let history = useHistory();
  // Create state to store confirmed booking info from DB
  const [booking, setBooking] = useState<Booking>();

  const deleteBooking = () => {
    console.log(booking?.bookingRef, booking?.customerInfo.firstName);
    history.push("/");
    console.log("booking deleted");  
    
    //Axios delete based on bookingRef route to back end
    axios.delete<Booking>(
      `http://localhost:8000/deleteReservation/${booking?.bookingRef}`
    );
  };

  // Collect the right booking info from DB and store in state
  useEffect(() => {
    axios
      .get<Booking>(`http://localhost:8000/confirmedReservation/${id}`)
      .then((response) => {
        setBooking(response.data);
      });
  }, [id]);

  return (
    <>
      <h1>Your booking has been confirmed</h1>
      {/* Send booking to Booking summary component */}
      <BookingSummary
        booking={booking}

      ></BookingSummary>
      <button onClick={deleteBooking}>DELETE BOOKING</button>
    </>
  );
};
