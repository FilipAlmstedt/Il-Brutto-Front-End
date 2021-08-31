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
    guestAmount: 1,
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
  }

  // Get seatingTime from AdminSeatingTime component // NOT DONE!!!
  const getSeatingTime = (chosenTime: string) => {
    const bookingObject = {...booking};
    bookingObject.seatingTime = chosenTime;
    setBooking(bookingObject);
  }

  // Get the guest amount from AdminGuestAmount component
  const getGuestAmount = (selectedGuestAmount: number) => {
    const bookingObject = {...booking};
    bookingObject.guestAmount = selectedGuestAmount;
    setBooking(bookingObject)
  }

  // Get customer information from AdminUserForm component
  const getCustomerInfo = (customerInput: CustomerInfo) => { 
    const bookingObject = {...booking};
    bookingObject.customerInfo = customerInput;
    setBooking(bookingObject);
    
    submitAllInfo();
  
  };

  const submitAllInfo = () => {
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
