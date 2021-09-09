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
import { LoadingComponent } from "../BookingComponents/LoadingComponent";


export const BookingPage = () => {
  const [earlyTable, setEarlyTable] = useState<Boolean>(false);
  const [lateTable, setLateTable] = useState<Boolean>(false);
  
  // State that are used as trigger for slideanimations for different components
  const [removeCalendarAnimation, setRemoveCalendarAnimation] = useState<Boolean>(false);
  const [removeCustomerInfoAnimation, setRemoveCustomerInfoAnimation] = useState<Boolean>(false);
  const [loadingAnimation, setLoadingAnimation] = useState<Boolean>(false);

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
    setRemoveCalendarAnimation(!removeCalendarAnimation);
  }

  // These fucntion trigger the set state functions that are triggered from links
  const goBackAndFourthCustomerInfo = () => {
    slideOutCustomerInfoComponent();
  }
  const goBackAndFourthCalendar = () => {
    slideOutCalendarComponent();
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
    // trigger loading animation
    setLoadingAnimation(!loadingAnimation);

    // Created so the loading function is present on the scree for 2 seconds and then move the user to confirmation page
    setTimeout(() => {
      axios
      .post<Booking>("http://localhost:8000/reservations", booking)
      .then((response) => {
        console.log("Added booking!");
        history.push(`/confirmation/${booking.bookingRef}`);
      });
    }, 2000)
  };
  // Toggle checkbox value when checking användarvilkor
  const toggleCheckbox = () => {
    setCheckBox(!checkBox);
  };

  return (
    <>
      
      <div className="bookingContainer">
        {/* A state activates the animation for the calendar to slide out of frame depending if the customer has clicked the seatingTime or not*/}
       
        <motion.div className="calenderContainer"
          initial={{
            x: '100vw'
          }}
          animate={{x: removeCalendarAnimation ? '-100vw': '0vw', display: removeCalendarAnimation ? 'none': 'flex'}}
          transition={{type: 'spring', delay: 0.3, stiffness: 40}}
          exit={{opacity: 0}}
        >
          <h4>Book a table</h4>
          <h5>Enter date and guest amount:</h5>
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
            /* seatingContainer is a div that is appearing when the removeCalendarAnimation trigger is changed */
            <motion.div className="seatingContainer"
              initial={{
                x: '100vw'
              }}
              animate={{x: removeCalendarAnimation ? '-100vw': '0vw', display: removeCalendarAnimation ? 'none': 'flex' }}
              exit={{opacity: 0}}
              transition={{type: 'spring', delay: 0.3, stiffness: 40}}
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
          <motion.div className="customerInfoContainer"
            initial={{
              x: '100vw'
            }}
            animate={{x: removeCustomerInfoAnimation ? '-100vw': '0vw',  display: removeCalendarAnimation ? 'flex': 'none'}}
            transition={{type: 'spring', delay: 0.3, stiffness: 40}}
          >
            <motion.div className="customerInfoContainer2"
              initial={{ x: '100vw'}}
              animate={{ x: removeCalendarAnimation ? 0: '100vw' , display: removeCustomerInfoAnimation ? 'none': 'flex' }}
              transition={{type: 'spring', delay: 0.3, stiffness: 40}}
            >
              <h4>Book a table</h4>
              <h5>Enter your contact information</h5>
              <p className="goBackLink" onClick={goBackAndFourthCalendar}>Gå tillbaka</p>
              <UserForm addCustomerInfo={getCustomerInfo} />
            </motion.div>
          </motion.div>
        ) : null}

        {/* Rendera summary ifall användare gått fyllt i och gått vidare med formuläret */}
        {summaryValue ? (
          <motion.div
            initial={{ x: '100vw'}}
            animate={{ x: removeCustomerInfoAnimation ? 0: '100vw' , display: removeCustomerInfoAnimation ? 'block': 'none'}}
            transition={{type: 'spring', delay: 0.3, stiffness: 40}}
          >
            <h4>Book a table</h4>
            <h5>Bokningsbekräftelse:</h5>
            <p className="goBackLink" onClick={goBackAndFourthCustomerInfo}>Gå tillbaka!</p>
            <BookingSummary booking={booking} />
            <GDPR checkBox={toggleCheckbox} />
          </motion.div>
        ) : null}
        {/* Rendera post-knapp ifall villkoren är godkända */}
        {checkBox ? (
          <motion.button className="post-button" onClick={submitAllInfo}
            initial={{x: '-100vw', y: '0vh'}}
            animate={{x: checkBox ? '0vw' : '-0vw'}}
          >
            ADD BOOKING
          </motion.button>
        ) : null}

      {/* Loading animation component when the loadinganimation state is triggered to true */}  
      {loadingAnimation ? (
          <LoadingComponent></LoadingComponent>
      ): null}
      
      </div>
    </>
  );
};
