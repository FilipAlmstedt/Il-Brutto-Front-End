import Moment from "react-moment";
import { Link } from "react-router-dom";
import { Booking } from "../../../Models/Booking";

// Inherit booking data and function from parent adminPage
interface IAdminBookingTable {
  bookings: Booking[];
  cancelReservation(bookingRef?: string): void;
}

export const AdminBookingTable = (props: IAdminBookingTable) => {
  //create function inherited from props
  const cancelReservation = (booking: Booking) => {
    props.cancelReservation(booking.bookingRef);
  };

  //map booking array and render out in li-tags
  let liTags = props.bookings.map((booking) => {
    return (
      <li key={booking.bookingRef}>
        <h4>
          {booking.customerInfo.firstName} {booking.customerInfo.lastName}
        </h4>
        <h5>Guestamount: {booking.guestAmount}</h5>
        <h5>
          Date: <Moment format="YYYY/MM/DD">{booking.date}</Moment>
        </h5>
        <h5>Seating time: {booking.seatingTime}</h5>
        <h5>Booking reference: {booking.bookingRef}</h5>

        <button
          className="delete-button"
          onClick={() => {
            cancelReservation(booking);
          }}
        >
          X
        </button>
        <Link to={`/edit/${booking.bookingRef}`}>
          <button className="edit-button">EDIT BOOKING</button>
        </Link>
      </li>
    );
  });

  return (
    <>
      <h2>Bookings</h2>
      <ul className="booking-table">{liTags}</ul>
    </>
  );
};
