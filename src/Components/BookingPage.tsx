import { CalendarPlugin } from "./BookingComponents/CalendarPlugin";
import { BookingSummary } from "./BookingComponents/BookingSummary";
import { UserForm } from "./BookingComponents/UserForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { Booking } from "../Models/Booking";
import Moment from 'react-moment';
import moment from "moment";

export const BookingPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  // let takenTables:number = 15;
  const getBookings = (chosenDate: Date, guestAmount: number) => {
    let currentBookings:Booking[] = [];
    let earlyBookings:Booking[] = [];
    let lateBookings:Booking[] = [];
    axios
      .get<Booking[]>("http://localhost:8000/reservations")
      .then((response)=> {
        
       for (let i = 0; i < response.data.length; i++) {
        let dbDate:Date = response.data[i].date;
        
        if(moment(chosenDate).format("YYYY MM DD") === moment(dbDate).format("YYYY MM DD")){

          currentBookings.push(response.data[i])
          
        }
       }
       
       for (let i = 0; i < currentBookings.length; i++) {
         (currentBookings[i].seatingTime === 'early') ? earlyBookings.push(currentBookings[i]) : lateBookings.push(currentBookings[i])
         
       }
       console.log("early:", earlyBookings.length, "late:", lateBookings.length);
       

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
      {/* { 
        (takenTables > 14)
          ? <div> Fullbooked </div> 
          : <div> 18.00 </div> 
      } */}

      {/* <UserForm></UserForm>
      <BookingSummary></BookingSummary> */}
    </>
  );
};
