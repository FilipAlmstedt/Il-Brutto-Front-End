import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Booking } from "../Models/Booking";
import { BookingSummary } from "./BookingComponents/BookingSummary";

interface IParams {
  id: string;
}

export const ConfirmationPage = () => {
  let { id } = useParams<IParams>();

  // Create state to store confirmed booking info from DB
  const [booking, setBooking] = useState<Booking>();

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
       <BookingSummary booking={booking}></BookingSummary> 
    </>
  );
};
