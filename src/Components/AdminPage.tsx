import axios from "axios";
import { useEffect, useState } from "react";
import { Booking } from "../Models/Booking";
import { CustomerInfo } from "../Models/CustomerInfo";
import { AdminCalendarPlugin } from "./AdminComponents/AdminCalendarPlugin";
import { AdminGuestAmount } from "./AdminComponents/AdminGuestAmount";
import { AdminSeatingTime } from "./AdminComponents/AdminSeatingTime";
import { AdminUserForm } from "./AdminComponents/AdminUserForm";

export const AdminPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  let defaultValues: Booking = {
    date: new Date,
    bookingRef: "abc123",
    guestAmount: 5,
    seatingTime: "",
    customerInfo: {
      firstName: "",
      lastName: "",
      email: "",
      tel: 123456,
      additionalInfo: ""
    }
  }
  const [booking, setBooking] = useState<Booking>(defaultValues);

  // Get chosen date from AdminCalendarPlugin component
  const getDate = (selectedDate: Date) => {
    const bookingObject = {...booking};
    bookingObject.date = selectedDate;
    setBooking(bookingObject);
    console.log(booking);
    
  }

  // Get seatingTime from AdminSeatingTime component // NOT DONE!!!
  const getSeatingTime = (chosenTime: string) => {
    const bookingObject = {...booking};
    bookingObject.seatingTime = chosenTime;
    setBooking(bookingObject);
    console.log(booking);
  }

  // Get the guest amount from AdminGuestAmount component
  const getGuestAmount = (selectedGuestAmount: number) => {
    const bookingObject = {...booking};
    bookingObject.guestAmount = selectedGuestAmount;
    setBooking(bookingObject)
    console.log(booking);
  }

  // Get customer information from AdminUserForm component
  const getCustomerInfo = (customerInput: CustomerInfo) => { 
    const bookingObject = {...booking};
    bookingObject.customerInfo = customerInput;
    setBooking(bookingObject);
    console.log(booking);
    
<<<<<<< HEAD
    //submitAllInfo();
=======
    
>>>>>>> ab33bed19d006ed13b0a383c87057b3efb3cf30e
  
  };

  const submitAllInfo = () => {
    //axios.post<Booking>("http://localhost:8000/admin", booking);
  }

  useEffect(() => {
    axios.get<Booking[]>("http://localhost:8000/admin").then((response) => {
      //console.log(response.data);
      setBookings(response.data);
    });
  }, []);

  // Everytime booking state is updated, we post to DB 
  // useEffect(() => {
  //   axios.post<Booking>("http://localhost:8000/admin", booking);
  // }, [booking])

  let liTags = bookings.map((booking) => {
    return (
      // Unikt vörde, id?
      <li key={booking.bookingRef}>
        <h1>{booking.seatingTime}</h1>
      </li>
    );
  });


  
  return (
    <>
      <AdminCalendarPlugin addChosenDate={getDate}></AdminCalendarPlugin>
      <AdminSeatingTime addSeatingTime={getSeatingTime}></AdminSeatingTime>
      <AdminGuestAmount addGuestAmount={getGuestAmount}></AdminGuestAmount>
      <AdminUserForm addCustomerInfo={getCustomerInfo}></AdminUserForm>
    <button onClick={submitAllInfo}> POST </button>
      <ul>{liTags}</ul>
      
    </>
  );
};
