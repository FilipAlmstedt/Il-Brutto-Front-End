import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Booking } from "../../Models/Booking";
import { CustomerInfo } from "../../Models/CustomerInfo";
import { AdminSeatingTime } from "./AdminSeatingTime";
import { UserForm } from "../BookingComponents/UserForm";
import { CalendarPlugin } from "../BookingComponents/CalendarPlugin";
import { BookingSummary } from "../BookingComponents/BookingSummary";

// Collect id - booking reference from URL
interface IParams {
  id: string;
}

// Component that is displaying the information for the customer and gives admin the possibility to update that info
export const AdminEditBooking = () => {
  let { id } = useParams<IParams>();
  // Booking info that you get from DB
  const [booking, setBooking] = useState<Booking>();

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

  // Booking object that you will update and the send to DB
  const [updatedBooking, setUpdatedBooking] = useState<Booking>(defaultValues);

  // Collect the booking object everytime the booking object is updated. The info updates on the page
  useEffect(() => {
    axios
      .get<Booking>(`http://localhost:8000/editReservation/${id}`)
      .then((response) => {
        setBooking(response.data);
      });
  }, [id]);

  // Get seating time from AdminSeatingTime component
  const getSeatingTime = (chosenTime: string) => {
    const bookingObject: Booking = { ...updatedBooking };
    bookingObject.seatingTime = chosenTime;
    setUpdatedBooking(bookingObject);
  };

  const getDateAndGuestAmount = (chosenDate: Date, guestAmount: number) => {
    const bookingObject = { ...updatedBooking };
    bookingObject.date = chosenDate;
    bookingObject.guestAmount = guestAmount;
    setUpdatedBooking(bookingObject);
  };
  // Get customer information from AdminUserForm component
  const getCustomerInfo = (customerInput: CustomerInfo) => {
    const bookingObject = { ...updatedBooking };
    bookingObject.customerInfo = customerInput;

    // Have the same bookingreference as the booking you collect so it update the right booking info
    bookingObject.bookingRef = id;

    setUpdatedBooking(bookingObject);
  };

  // Call post request to back end and store in DB
  const updateBooking = () => {
    axios.post(`http://localhost:8000/editReservation`, updatedBooking);
  };

  return (
    <>
      <div className="editBookingContainer">
        <h4>UPPDATERA BOKNING</h4>
        <BookingSummary booking={booking} />

        <CalendarPlugin getUserInput={getDateAndGuestAmount} />

        <div className="user-inputs">
          <AdminSeatingTime addSeatingTime={getSeatingTime} />

          <h5>Gästinformation</h5>
          <UserForm addCustomerInfo={getCustomerInfo} />

          <h5>Stämmer ovanstående uppgifter?</h5>

          <button className="post-button" type="button" onClick={updateBooking}>
            Spara
          </button>
          <Link to="/admin">Tillbaka</Link>
        </div>
      </div>
    </>
  );
};
