import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
            <div className="showEditBookingInfoContainer">
                <h1>Booking information for {booking?.customerInfo.firstName}</h1>
                <div className="bookingInfoDiv">
                    <div className="bookingRefAndDate">
                        <ul>
                            <li><b>Booking reference:</b> {id}</li>
                            <li><b>Date: </b>{booking?.date}</li>
                        </ul>
                    </div>

                    <div className="bookingGuestAmountAndSeatingTime">
                        <ul>
                            <li><b>Amount of guests booked:</b> {booking?.guestAmount}</li>
                            <li><b>Seating time:</b> {booking?.seatingTime}</li>      
                        </ul>
                    </div>     
                </div>
                <div className="customerInfoDiv">
                    <h3>Customer info: </h3>
                    <ul>
                        <li><b>Firstname:</b> {booking?.customerInfo.firstName}</li>
                        <li><b>Lastname:</b> {booking?.customerInfo.lastName}</li>
                        <li><b>Email:</b> {booking?.customerInfo.email}</li>
                        <li><b>Phone number:</b> {booking?.customerInfo.tel}</li>
                        <li><b>Additional info:</b> {booking?.customerInfo.additionalInfo}</li>
                    </ul>
                </div>
                <hr className="line" />
            </div>

            

            <AdminCalendarPlugin addChosenDate={getDate}></AdminCalendarPlugin>
            <div className="user-inputs">
                <AdminSeatingTime addSeatingTime={getSeatingTime}></AdminSeatingTime>
                <AdminGuestAmount addGuestAmount={getGuestAmount}></AdminGuestAmount>
                <AdminUserForm addCustomerInfo={getCustomerInfo}></AdminUserForm>

                <hr className="line2" />

                <button type="button" onClick={updateBooking}>Update booking!</button>
                <Link to="/admin">Go back!</Link>
            </div>
        </>
    );
}