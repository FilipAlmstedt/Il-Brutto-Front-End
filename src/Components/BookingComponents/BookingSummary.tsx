import { Booking } from "../../Models/Booking";

export const BookingSummary = () => {
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
    </>
  );
};
