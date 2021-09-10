import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Booking } from "../../Models/Booking";
import { CustomerInfo } from "../../Models/CustomerInfo";
import { AdminSeatingTime } from "./AdminSeatingTime";
import { UserForm } from "../BookingComponents/UserForm";
import { CalendarPlugin } from "../BookingComponents/CalendarPlugin";
import { BookingSummary } from "../BookingComponents/BookingSummary";
import moment from "moment";

// Collect id - booking reference from URL
interface IParams {
  id: string;
}

// Component that is displaying the information for the customer and gives admin the possibility to update that info
export const AdminEditBooking = () => {
  let history = useHistory();
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

  // Get date from calendarPlugin component
  const getDate = (chosenDate: Date) => {
    const bookingObject = { ...updatedBooking };
    bookingObject.date = chosenDate;
    setUpdatedBooking(bookingObject);
  };

  // Get seating time from AdminSeatingTime component
  const getSeatingTime = (chosenTime: string) => {
    const bookingObject: Booking = { ...updatedBooking };
    bookingObject.seatingTime = chosenTime;
    setUpdatedBooking(bookingObject);
  };

  // Get guestAmount from calendarPlugin component
  const getGuestAmount = (guestAmount: number) => {
    const bookingObject = { ...updatedBooking };
    bookingObject.guestAmount = guestAmount;
    setUpdatedBooking(bookingObject);
  };

  // Get customer information from UserForm component
  const getCustomerInfo = (customerInput: CustomerInfo) => {
    let bookingObject = { ...updatedBooking };

    // If no new date, guestAmount or SeatingTime is provided,
    // Adopt previous booking values
    if (
      bookingObject.guestAmount === 0 &&
      moment(bookingObject.date).format("YYYY MM DD") ===
        moment(new Date()).format("YYYY MM DD") &&
      bookingObject.seatingTime === ""
    ) {
      bookingObject.guestAmount = booking?.guestAmount || 0;
      bookingObject.date = booking?.date || new Date();
      bookingObject.seatingTime = booking?.seatingTime || "";
    }

    bookingObject.customerInfo = customerInput;

    // Have the same bookingreference as the booking you collect so it update the right booking info
    bookingObject.bookingRef = id;
    setUpdatedBooking(bookingObject);
  };

  // Call post request to back end and store in DB
  const updateBooking = () => {
    axios
      .post(`http://localhost:8000/editReservation`, updatedBooking)
      .then((response) => {
        history.push("/admin");
      });
  };

  return (
    <>
      <div className="editBookingContainer">
        <h4>UPPDATERA BOKNING</h4>
        <BookingSummary booking={booking} />

        <CalendarPlugin getDate={getDate} getGuestAmount={getGuestAmount} />

        <div className="user-inputs">
          <AdminSeatingTime addSeatingTime={getSeatingTime} />

          <h5>Gästinformation</h5>
          <UserForm addCustomerInfo={getCustomerInfo} />

          <h5>Stämmer ovanstående uppgifter?</h5>
          {updatedBooking.customerInfo.firstName === "" ? null : (
            <button
              className="post-button"
              type="button"
              onClick={updateBooking}
            >
              Spara
            </button>
          )}
          <Link to="/admin">Tillbaka</Link>
        </div>
      </div>
    </>
  );
};
