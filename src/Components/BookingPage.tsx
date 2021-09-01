import { CalendarPlugin } from "./BookingComponents/CalendarPlugin";
import { BookingSummary } from "./BookingComponents/BookingSummary";
import { UserForm } from "./BookingComponents/UserForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { Booking } from "../Models/Booking";
import Moment from 'react-moment';
import moment from "moment";
import { EarlyAvailable } from "./BookingComponents/SeatingComponents/EarlyAvailable";
import { EarlyFull } from "./BookingComponents/SeatingComponents/EarlyFull";
import { LateAvailable } from "./BookingComponents/SeatingComponents/LateAvailable";
import { LateFull } from "./BookingComponents/SeatingComponents/LateFull";

export const BookingPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  let earlyTable:Boolean = true;
  let lateTable:Boolean = true;
 

  const getBookings = (chosenDate: Date, guestAmount: number) => {
    let currentBookings:Booking[] = [];
    let earlyBookings:Booking[] = [];
    let lateBookings:Booking[] = [];
    axios
      .get<Booking[]>("http://localhost:8000/reservations")
      .then((response)=> {
      //Hitta befintliga bokningar på kundens valda datum
       for (let i = 0; i < response.data.length; i++) {
        let dbDate:Date = response.data[i].date;

        if(moment(chosenDate).format("YYYY MM DD") === moment(dbDate).format("YYYY MM DD")){
          currentBookings.push(response.data[i])
        }
       }
       //Dela upp de befintliga bokningarna i late/early sittningar
       for (let i = 0; i < currentBookings.length; i++) {
         // if/else för uppdelning
         (currentBookings[i].seatingTime === 'early') ? earlyBookings.push(currentBookings[i]) : lateBookings.push(currentBookings[i])
       }
       console.log("early:", earlyBookings.length, "late:", lateBookings.length);
       (earlyBookings.length <= 14) ? earlyTable = true : earlyTable = false;
       (lateBookings.length <= 14) ? lateTable = true : lateTable = false;

      })
    
     
      
  };



  useEffect(() => {
    axios
      .get<Booking[]>("http://localhost:8000/reservations")
      .then((response) => {

        setBookings(response.data);
      });
  }, []);



  return (
    <>
      <CalendarPlugin getUserInput={getBookings}></CalendarPlugin>
      <div className="seatingContainer">
      {earlyTable ? <EarlyAvailable/> : <EarlyFull/>}
      {lateTable ? <LateAvailable/> : <LateFull/>}
      </div>

      {/* <UserForm></UserForm>
      <BookingSummary></BookingSummary> */}
    </>
  );
};
