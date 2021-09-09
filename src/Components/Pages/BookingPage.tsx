import { CalendarPlugin } from "../BookingComponents/CalendarPlugin";
import { useEffect, useState } from "react";
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
import { NONAME } from "dns";

export const BookingPage = () => {
  const [earlyTable, setEarlyTable] = useState<Boolean>(false);
  const [lateTable, setLateTable] = useState<Boolean>(false);

  // State that are used as trigger for slideanimations for different components
  const [removeCalendarAnimation, setRemoveCalendarAnimation] = useState<Boolean>(false);
  const [removeCustomerInfoAnimation, setRemoveCustomerInfoAnimation] = useState<Boolean>(false);
  const [loadingAnimation, setLoadingAnimation] = useState<Boolean>(false);

  const [lateTablesTaken, setLateTablesTaken] = useState<number>(0);
  const [earlyTablesTaken, setEarlyTablesTaken] = useState<number>(0);  
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

  const getDateAndGuestAmount = (chosenDate: Date, guestAmount:number) => {
    const bookingObject = { ...booking };
    bookingObject.date = chosenDate;
    bookingObject.guestAmount = guestAmount;
    setBooking(bookingObject);
  };

  // const getGuestAmount = (selectedGuestAmount: number) => {
  //   const bookingObject = { ...booking };
  //   bookingObject.guestAmount = selectedGuestAmount;
  //   setBooking(bookingObject);
  // };

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
  };
  const slideOutCalendarComponent = () => {
    setRemoveCalendarAnimation(!removeCalendarAnimation);
  };

  // These fucntion trigger the set state functions that are triggered from links
  const goBackAndFourthCustomerInfo = () => {
    slideOutCustomerInfoComponent();
  };
  const goBackAndFourthCalendar = () => {
    slideOutCalendarComponent();
  };

  const sortBookings = (chosenDate: Date, guestAmount: number) => {
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
              moment(dbDate).format("YYYY MM DD") &&
            response.data[i].seatingTime === "early"
          ) {
            earlyBookings.push(response.data[i]);
          } else if (
            moment(chosenDate).format("YYYY MM DD") ===
              moment(dbDate).format("YYYY MM DD") &&
            response.data[i].seatingTime === "late"
          ) {
            lateBookings.push(response.data[i]);
          }
        }
        

        getDateAndGuestAmount(chosenDate, guestAmount)
        checkAvailability(earlyBookings, lateBookings, guestAmount);
      });
  };

  const checkAvailability = (
    earlyBookings: Booking[],
    lateBookings: Booking[],
    guestAmount: number
  ) => {
    
    let lateTables: number = 0;
    let earlyTables:number = 0;
    for (let i = 0; i < lateBookings.length; i++) {
      (lateBookings[i].guestAmount <= 6 ? lateTables++ : lateTables += 2)
    }
    for (let i = 0; i < earlyBookings.length; i++) {
      (earlyBookings[i].guestAmount <= 6 ? earlyTables++ : earlyTables += 2)
    }

    setLateTablesTaken(lateTables);
    setEarlyTablesTaken(earlyTables);

    (guestAmount <= 6 ? setLateTable(lateTablesTaken <= 14) : setLateTable(lateTablesTaken <= 13));
    (guestAmount <= 6 ? setEarlyTable(earlyTablesTaken <= 14) : setEarlyTable(earlyTablesTaken <= 13));
  };

  useEffect(() => {
    console.log("latetables:" + lateTablesTaken);
    
  }, [lateTablesTaken]);

  useEffect(() => {
    console.log("latefull?:" + lateTable);
    
  }, [lateTable]);



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
            x: "100vw",
          }}
          animate={{x: removeCalendarAnimation ? '-100vw': '0vw', display: removeCalendarAnimation ? 'none': 'flex'}}
          transition={{type: 'spring', delay: 0.3, stiffness: 40}}
          exit={{opacity: 0}}
        >
          <h4>Book a table</h4>
          <h5>Enter date and guest amount:</h5>
          <CalendarPlugin 
            getUserInput={sortBookings}
            // getUserDate={sortBookings}
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
          <motion.div className="userFormContainer customerInfoContainer"
            initial={{
              display: "visible",
              x: "100vw",
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
          <motion.button className="post-button"
            onClick={submitAllInfo}
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
