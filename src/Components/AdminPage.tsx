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
  
  
  //Create states for each child components to then store in booking state
  const [chosenDate, setChosenDate] = useState<Date>(new Date); 
  const [seatingTime, setSeatingTime] = useState(""); 
  const [guestAmount, setGuestAmount] = useState(1); 
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({firstName: "", lastName: "", tel: 0, email: "", additionalInfo: ""}); 


  const [booking, setBooking] = useState<Booking>({date: chosenDate, seatingTime: seatingTime, bookingRef: "abc123", guestAmount: guestAmount, customerInfo: customerInfo});

  // Get chosen date from AdminCalendarPlugin component
  const getDate = (selectedDate: Date) => {
    setChosenDate(selectedDate);
  }

  // Get seatingTime from AdminSeatingTime component // NOT DONE!!!
  const getSeatingTime = (chosenTime: string) => {
    setSeatingTime(chosenTime);
  }

  // Get the guest amount from AdminGuestAmount component
  const getGuestAmount = (selectedGuestAmount: number) => {
    setGuestAmount(selectedGuestAmount);
  }

  // Get customer information from AdminUserForm component
  const getCustomerInfo = (customerInput: CustomerInfo) => { 
    setCustomerInfo(customerInput);
    
    submitAllInfo();
  
  };

  const submitAllInfo = () => {
    const bookingInput: Booking = {date: chosenDate, bookingRef: "abc123", seatingTime: seatingTime, guestAmount: guestAmount, customerInfo: customerInfo}; 
    setBooking(bookingInput);
    console.log(booking);
    axios.post<Booking>("http://localhost:8000/admin", booking);
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
