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
  const [booking, setBooking] = useState<Booking>({date: new Date, seatingTime: "", bookingRef: "abc123", guestAmount: 0, customerInfo: {firstName: "", lastName: "", tel: 0, email: "", additionalInfo: ""}});

  // Get chosen date from AdminCalendarPlugin component
  const getDate = (selectedDate: Date) => {
    const update: Booking = {...booking}; 
    update.date = selectedDate;
    setBooking(update);
  }

  // Get seatingTime from AdminSeatingTime component // NOT DONE!!!
  const getSeatingTime = (chosenTime: string) => {
    const update: Booking = {...booking}; 
    update.seatingTime = chosenTime;
    setBooking(update);
  }

  // Get the guest amount from AdminGuestAmount component
  const getGuestAmount = (selectedGuestAmount: number) => {
    const update: Booking = {...booking}; 
    update.guestAmount = selectedGuestAmount;
    setBooking(update);
  }

  // Get customer information from AdminUserForm component
  const getCustomerInfo = (customerInput: CustomerInfo) => { 
    //console.log(customerInput);
    
    const update: Booking = {...booking}; 
    update.customerInfo = customerInput;
    setBooking(update);
    console.log(booking);
    //submitAllInfo();
  
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

  /*console.log(chosenDate);
  console.log(guestAmount);
  console.log(seatingTime);
  console.log(customerInfo);*/
  
  
  
  
  return (
    <>
      <AdminCalendarPlugin addChosenDate={getDate}></AdminCalendarPlugin>
      <AdminSeatingTime addSeatingTime={getSeatingTime}></AdminSeatingTime>
      <AdminGuestAmount addGuestAmount={getGuestAmount}></AdminGuestAmount>
      <AdminUserForm addCustomerInfo={getCustomerInfo}></AdminUserForm>
      <ul>{liTags}</ul>
      
    </>
  );
};
