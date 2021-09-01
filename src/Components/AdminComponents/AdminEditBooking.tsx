import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Booking } from "../../Models/Booking";
import { CustomerInfo } from "../../Models/CustomerInfo";
import { AdminCalendarPlugin } from "./AdminCalendarPlugin";
import { AdminGuestAmount } from "./AdminGuestAmount";
import { AdminSeatingTime } from "./AdminSeatingTime";
import { AdminUserForm } from "./AdminUserForm";

// Collect id - booking reference from URL
interface IParams {
    id: string;
}

// Component that is displaying the information for the customer and gives admin the possibility to update that info
export const AdminEditBooking = () => {

    let {id} = useParams<IParams>();
    // Booking info that you get from DB 
    const [booking, setBooking] = useState<Booking>();

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

    // Booking object that you will update and the send to DB 
    const [updatedBooking, setUpdatedBooking] = useState<Booking>(defaultValues);

    // Collect the booking object everytime the booking object is updated. The info updates on the page
    useEffect(() => {
        axios.get<Booking>(`http://localhost:8000/editReservation/${id}`).then((response) => {
            setBooking(response.data);
        });
    }, [booking]);

    // Get chosen date from AdminCalendarPlugin component
    const getDate = (selectedDate: Date) => {
        const bookingObject: Booking = {...updatedBooking};
        bookingObject.date = selectedDate;
        setUpdatedBooking(bookingObject);
    };

    // Get seating time from AdminSeatingTime component
    const getSeatingTime = (chosenTime: string) => {
        const bookingObject: Booking = {...updatedBooking};
        bookingObject.seatingTime = chosenTime;
        setUpdatedBooking(bookingObject);
    };

    // Get the guest amount from AdminGuestAmount component
    const getGuestAmount = (selectedGuestAmount: number) => {
        const bookingObject: Booking = {...updatedBooking};
        bookingObject.guestAmount = selectedGuestAmount;
        setUpdatedBooking(bookingObject);
    };

    // Get customer information from AdminUserForm component
    const getCustomerInfo = (customerInput: CustomerInfo) => {
        const bookingObject = {...updatedBooking};
        bookingObject.customerInfo = customerInput;

        // Have the same bookingreference as the booking you collect so it update the right booking info
        bookingObject.bookingRef = id;

        setUpdatedBooking(bookingObject);
    };
  
    // Call post request to back end and store in DB
    const updateBooking = () => {
        axios.post(`http://localhost:8000/editReservation`, updatedBooking);
    }

    return (
        <>
            <h1>Booking information for {booking?.customerInfo.firstName}</h1>

            <ul>
                <li>Bookingreference: {id}</li>
                <li>Date: {booking?.date}</li>
                <li>Amount of guests booked: {booking?.guestAmount}</li>
                <li>Seating time: {booking?.seatingTime}</li>
            </ul>

            <h3>Customer info: </h3>
            <ul>
                <li>Firstname: {booking?.customerInfo.firstName}</li>
                <li>Lastname: {booking?.customerInfo.lastName}</li>
                <li>Email: {booking?.customerInfo.email}</li>
                <li>Phone number: {booking?.customerInfo.tel}</li>
                <li>Additional info: {booking?.customerInfo.additionalInfo}</li>
            </ul>

            <AdminCalendarPlugin addChosenDate={getDate}></AdminCalendarPlugin>
            <AdminSeatingTime addSeatingTime={getSeatingTime}></AdminSeatingTime>
            <AdminGuestAmount addGuestAmount={getGuestAmount}></AdminGuestAmount>
            <AdminUserForm addCustomerInfo={getCustomerInfo}></AdminUserForm>
            <button type="button" onClick={updateBooking}>Update booking!</button>
        </>
    );
}