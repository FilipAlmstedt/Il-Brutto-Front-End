import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
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

  let history = useHistory();

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

  // Get chosen date from AdminCalendarPlugin component
  const getDate = (selectedDate: Date) => {
    const bookingObject: Booking = { ...updatedBooking };
    bookingObject.date = selectedDate;
    setUpdatedBooking(bookingObject);
  };

  // Get seating time from AdminSeatingTime component
  const getSeatingTime = (chosenTime: string) => {
    const bookingObject: Booking = { ...updatedBooking };
    bookingObject.seatingTime = chosenTime;
    setUpdatedBooking(bookingObject);
  };

  // Get the guest amount from AdminGuestAmount component
  const getGuestAmount = (selectedGuestAmount: number) => {
    const bookingObject: Booking = { ...updatedBooking };
    bookingObject.guestAmount = selectedGuestAmount;
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

  const deleteBooking = () => {
    console.log(booking?.bookingRef, booking?.customerInfo.firstName);
    
    //Axios delete based on bookingRef route to back end
    axios.delete<Booking>(
      `http://localhost:8000/deleteReservation/${booking?.bookingRef}`
    );
    history.push("/admin");
  };

  return (
    <>
      <BookingSummary
        booking={booking}
      />

      <CalendarPlugin getUserAmount={getGuestAmount} getUserDate={getDate} />

      <div className="user-inputs">
        <AdminSeatingTime addSeatingTime={getSeatingTime} />
        <UserForm addCustomerInfo={getCustomerInfo} />

        <hr className="line2" />

        <button type="button" onClick={updateBooking}>
          Update booking!
        </button>
        <Link to="/admin">Go back!</Link>
      </div>
      <button onClick={deleteBooking}>DELETE BOOKING</button>
    </>
  );
};
