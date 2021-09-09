import { CalendarPlugin } from "../BookingComponents/CalendarPlugin";
import { useState } from "react";
import axios from "axios";
import { Booking } from "../../Models/Booking";
import moment from "moment";
import { EarlySeating } from "../BookingComponents/SeatingComponents/EarlySeating";
import { LateSeating } from "../BookingComponents/SeatingComponents/LateSeating";
import { UserForm } from "../BookingComponents/UserForm";
import { CustomerInfo } from "../../Models/CustomerInfo";
import { v1 as uuidv1 } from "uuid";
import { useHistory } from "react-router-dom";
import { BookingSummary } from "../BookingComponents/BookingSummary";
import { GDPR } from "../BookingComponents/GDPR";
import { motion } from "framer-motion";


export const BookingPage = () => {
  const [earlyTable, setEarlyTable] = useState<Boolean>(false);
  const [lateTable, setLateTable] = useState<Boolean>(false);
  
  // State that are used as trigger for slideanimations for different components
  const [removeCalendarAnimation, setRemoveCalendarAnimation] = useState<Boolean>(false);
  const [removeCustomerInfoAnimation, setRemoveCustomerInfoAnimation] = useState<Boolean>(false);

  const [summaryValue, setSummaryValue] = useState<Boolean>(false);
  const [checkBox, setCheckBox] = useState<Boolean>(false);
  let history = useHistory();

  let defaultValues: Booking = {
    date: new Date(),
    bookingRef: "",
    guestAmount: 2,
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

    slideOutCalendarComponent();
  };

  //Slå om summaryValue så att summary renderas med ifyllda värden
  const showSummary = () => {
    setSummaryValue(true);
  };

  const getCustomerInfo = (customerInput: CustomerInfo) => {
    const bookingObject = { ...booking };
    bookingObject.customerInfo = customerInput;

    // Create unique bookingRef
    bookingObject.bookingRef = uuidv1();
    setBooking(bookingObject);
    showSummary();

    slideOutCustomerInfoComponent();

  };

  // When these two functions are called, they change the state and the animations are triggered
  const slideOutCustomerInfoComponent = () => {
    setRemoveCustomerInfoAnimation(!removeCustomerInfoAnimation);
  }
  const slideOutCalendarComponent = () => {
    setRemoveCalendarAnimation(!removeCalendarAnimation);;
  }

  // These fucntion trigger the set state functions that are triggered from links
  const goBackAndFourthCustomerInfo = () => {
    slideOutCustomerInfoComponent();
  }
  const goBackAndFourthCalendar = () => {
    slideOutCalendarComponent()
  }

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
        //history.push(`/confirmation/${booking.bookingRef}`);
        // console.log("Hello!");
      });

    // Should be in then but it doesn't work right now: only for users at BookingPage

    history.push(`/confirmation/${booking.bookingRef}`);
  };
  // Toggle checkbox value when checking användarvilkor
  const toggleCheckbox = () => {
    setCheckBox(!checkBox);
  };

  return (
    <>
      
      <div className="bookingContainer">
        <h4>Book a table</h4>
        <h5>Enter your desired preferences below:</h5>
        {/* A state activates the animation for the calendar to slide out of frame depending if the customer has clicked the seatingTime or not*/}
        <motion.div className="calenderContainer"
          initial={{
            x: '100vw'
          }}
          animate={{x: removeCalendarAnimation ? '-100vw': '0vw'}}
          transition={{type: 'spring', delay: 0.6, stiffness: 40}}
        >
          <CalendarPlugin
            getUserAmount={getGuestAmount}
            getUserDate={sortBookings}
          ></CalendarPlugin>
        </motion.div>
        {/* rendera komponent beroende på tillgänglighet */}
        <div>
          {/* If all the table are booked, show a text that forces the customer to pick another date to book a table */}
          {earlyTable === false && lateTable === false ? (
            <h4>
              No reservations are available at this date, try a different date!
            </h4>
          ) : (
            <motion.div className="seatingContainer"
              initial={{
                x: '100vw'
              }}
              animate={{x: removeCalendarAnimation ? '-100vw': '0vw'}}
              transition={{type: 'spring', delay: 0.6, stiffness: 40}}
            >
              <h5>Select time:</h5>
              <EarlySeating
                addSeatingTime={getSeatingTime}
                availability={earlyTable}
              />
              <p>or:</p>
              <LateSeating
                addSeatingTime={getSeatingTime}
                availability={lateTable}
              />
            </motion.div>
          )}
        </div>
        {booking.seatingTime === "late" || booking.seatingTime === "early" ? (
          <motion.div
            initial={{
              x: '100vw'
            }}
            animate={{x: removeCustomerInfoAnimation ? '-100vw': '0vw'}}
            transition={{type: 'spring', delay: 0.5, stiffness: 40}}
          >
            <motion.div className="showEditBookingInfoContainer"
              initial={{ x: '100vw', y: '-35vh'}}
              animate={{ x: removeCalendarAnimation ? 0: '100vw' , y: '-35vh'}}
              transition={{type: 'spring', delay: 0.5, stiffness: 40}}
            >
              <p onClick={goBackAndFourthCalendar}>Detta är en länk! Styla den! Tillbaka</p>
              <UserForm addCustomerInfo={getCustomerInfo} />
            </motion.div>
          </motion.div>
        ) : null}

        {/* Rendera summary ifall användare gått fyllt i och gått vidare med formuläret */}
        {summaryValue ? (
          <motion.div
            initial={{ x: '100vw', y: '-65vh'}}
            animate={{ x: removeCustomerInfoAnimation ? 0: '100vw' , y: '-70vh'}}
            transition={{type: 'spring', delay: 0.4, stiffness: 40}}
            >
            <p onClick={goBackAndFourthCustomerInfo}>Detta är en länk! Styla den! Tillbaka</p>
            <BookingSummary booking={booking} />
            <GDPR checkBox={toggleCheckbox} />
          </motion.div>
        ) : null}
        {/* Rendera post-knapp ifall villkoren är godkända */}
        {checkBox ? (
          <motion.button className="post-button"  onClick={submitAllInfo}
            initial={{x: '-100vw', y: '-60vh'}}
            animate={{x: checkBox ? '0vw' : '90vw'}}
          >
            ADD BOOKING
          </motion.button>
        ) : null}
      </div>
    </>
  );
};
