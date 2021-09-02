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

  const [booking, setBooking] = useState<Booking>();

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
      <BookingSummary></BookingSummary>
    </>
  );
};
