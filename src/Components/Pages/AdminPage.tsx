import axios from "axios";
import { useEffect, useState } from "react";
import { Booking } from "../../Models/Booking";
import { CustomerInfo } from "../../Models/CustomerInfo";
import { AdminSeatingTime } from "../AdminComponents/AdminSeatingTime";
import { UserForm } from "../BookingComponents/UserForm";
import { useHistory } from "react-router-dom";
import { v1 as uuidv1 } from "uuid";
import { AdminBookingTable } from "../AdminComponents/AdminBookingTable";
import { CalendarPlugin } from "../BookingComponents/CalendarPlugin";

export const AdminPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

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
    bookingObject.bookingRef = uuidv1();
    setBooking(bookingObject);
  };

  //Post request using booking state
  const submitAllInfo = () => {
    axios
      .post<Booking>("http://localhost:8000/admin", booking)
      .then((response) => {
        getBookings();
      });
  };

  // Separate function for axios get request
  const getBookings = () => {
    axios.get<Booking[]>("http://localhost:8000/admin").then((response) => {
      setBookings(response.data);
    });
  };

  //Calling bookings state every time user lands on page
  useEffect(() => {
    getBookings();
  }, []);


  const deleteBooking = (bookingRef: string) => {
    //Axios delete based on bookingRef route to back end & updates page when a booking is deleted
    axios.delete<Booking>(`http://localhost:8000/admin/delete/${bookingRef}`).then((response)=> {
      getBookings();
    })

  };

  return (
    <>
      <CalendarPlugin getUserAmount={getGuestAmount} getUserDate={getDate} />
      <div className="user-inputs">
        <AdminSeatingTime addSeatingTime={getSeatingTime} />
        <UserForm addCustomerInfo={getCustomerInfo} />
        <h2>Is above information entered correctly?</h2>
        <button className="post-button" onClick={submitAllInfo}>
          ADD BOOKING
        </button>
      </div>
      <AdminBookingTable
        cancelReservation={deleteBooking}
        bookings={bookings}
      />
    </>
  );
};
