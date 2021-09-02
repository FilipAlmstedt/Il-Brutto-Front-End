import { Booking } from "../../Models/Booking";

// If booking poosibly is undefined, don't use, but if it finds booking, collect data
interface IBookingSummaryProps {
    booking?: Booking;
}

// Component that show customer all the booking info about his/her reservation 
export const BookingSummary = (props: IBookingSummaryProps) => {
    
    return (
        <>
            <div className="showEditBookingInfoContainer">
                <h1>Booking information for {props.booking?.customerInfo.firstName}</h1>
                <div className="bookingInfoDiv">
                    <div className="bookingRefAndDate">
                        <ul>
                            <li><b>Booking reference:</b> {props.booking?.bookingRef}</li>
                            <li><b>Date: </b>{props.booking?.date}</li>
                        </ul>
                    </div>

                    <div className="bookingGuestAmountAndSeatingTime">
                        <ul>
                            <li><b>Amount of guests booked:</b> {props.booking?.guestAmount}</li>
                            <li><b>Seating time:</b> {props.booking?.seatingTime}</li>      
                        </ul>
                    </div>     
                </div>
                <div className="customerInfoDiv">
                    <h3>Customer info: </h3>
                    <ul>
                        <li><b>Firstname:</b> {props.booking?.customerInfo.firstName}</li>
                        <li><b>Lastname:</b> {props.booking?.customerInfo.lastName}</li>
                        <li><b>Email:</b> {props.booking?.customerInfo.email}</li>
                        <li><b>Phone number:</b> {props.booking?.customerInfo.tel}</li>
                        <li><b>Additional info:</b> {props.booking?.customerInfo.additionalInfo}</li>
                    </ul>
                </div>
                <hr className="line" />
            </div>
        </>
    );
};
