import { CalendarPlugin } from "../BookingComponents/CalendarPlugin";
import { useState } from "react";
import axios from "axios";
import { Booking } from "../../Models/Booking";
import moment from "moment";
import { EarlyAvailable } from "../BookingComponents/SeatingComponents/EarlyAvailable";
import { EarlyFull } from "../BookingComponents/SeatingComponents/EarlyFull";
import { LateAvailable } from "../BookingComponents/SeatingComponents/LateAvailable";
import { LateFull } from "../BookingComponents/SeatingComponents/LateFull";
import { UserForm } from "../BookingComponents/UserForm";
import { CustomerInfo } from "../../Models/CustomerInfo";
import { v1 as uuidv1 } from "uuid";
import { useHistory } from "react-router-dom";
import { BookingSummary } from "../BookingComponents/BookingSummary";

export const BookingPage = () => {
  const [earlyTable, setEarlyTable] = useState<Boolean>(false);
  const [lateTable, setLateTable] = useState<Boolean>(false);
  const [summaryValue, setSummaryValue] = useState<Boolean>(false);
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

  const getDate = (selectedDate: Date) => {
    const bookingObject = { ...booking };
    bookingObject.date = selectedDate;
    setBooking(bookingObject);
  };
  const getGuestAmount = (selectedGuestAmount: number) => {
    const bookingObject = { ...booking };
    bookingObject.guestAmount = selectedGuestAmount;
    setBooking(bookingObject);
  };

  const getSeatingTime = (chosenTime: string) => {
    const bookingObject = { ...booking };
    bookingObject.seatingTime = chosenTime;
    setBooking(bookingObject);
  };

  const showSummary = () => {
    setSummaryValue(true);
    
  }
  const getCustomerInfo = (customerInput: CustomerInfo) => {
    const bookingObject = { ...booking };
    bookingObject.customerInfo = customerInput;
  
    // Create unique bookingRef
    bookingObject.bookingRef = uuidv1();
    setBooking(bookingObject);
    showSummary()
    
  };

  const sortBookings = (chosenDate: Date) => {
    let currentBookings: Booking[] = [];
    let earlyBookings: Booking[] = [];
    let lateBookings: Booking[] = [];
    axios
      .get<Booking[]>("http://localhost:8000/reservations")
      .then((response) => {
        //Hitta befintliga bokningar på kundens valda datum
        for (let i = 0; i < response.data.length; i++) {
          let dbDate: Date = response.data[i].date;
          if (
            moment(chosenDate).format("YYYY MM DD") ===
            moment(dbDate).format("YYYY MM DD")
          ) {
            currentBookings.push(response.data[i]);
          }
        }
        //Dela upp de befintliga bokningarna i late/early sittningar
        for (let i = 0; i < currentBookings.length; i++) {
          // if/else för uppdelning
          currentBookings[i].seatingTime === "early"
            ? earlyBookings.push(currentBookings[i])
            : lateBookings.push(currentBookings[i]);
        }

        //Ändra early och late table-state beroende på tillgängliga bord
        setEarlyTable(earlyBookings.length <= 14);
        setLateTable(lateBookings.length <= 14);

        //Fyll på booking-state med gästens valda amount och datum
        getDate(chosenDate);
      });
  };

  //Post request using booking state
  const submitAllInfo = () => {
    axios
      .post<Booking>("http://localhost:8000/admin", booking)
      .then((response) => {
        //To be removed / Solved
        // history.push(`/confirmation/${booking.bookingRef}`);
        // console.log("Hello!");
      });

    // Should be in then but it doesn't work right now: only for users at BookingPage

    history.push(`/confirmation/${booking.bookingRef}`);
  };

  return (
    <>
    <h1>Book a table at Il Brutto!</h1>
    <h3>Enter your desired preferences below:</h3>
      <div className="calenderContainer">
        <CalendarPlugin
          getUserAmount={getGuestAmount}
          getUserDate={sortBookings}
        ></CalendarPlugin>
      </div>
      {/* rendera komponent beroende på tillgänglighet */}
      <div className="seatingContainer">
        {earlyTable ? (
          <EarlyAvailable addSeatingTime={getSeatingTime} />
        ) : (
          <EarlyFull />
        )}
        {lateTable ? (
          <LateAvailable addSeatingTime={getSeatingTime} />
        ) : (
          <LateFull />
        )}
      </div>
      {booking.seatingTime === "late" || booking.seatingTime === "early" ? (
        <UserForm addCustomerInfo={getCustomerInfo} />
      ) : null}

      {summaryValue ? (
        <div>
      <BookingSummary booking={booking} />
      <button className="post-button" onClick={submitAllInfo}>
      ADD BOOKING
    </button> </div>)
      : null}

        

      
    </>
  );
};
