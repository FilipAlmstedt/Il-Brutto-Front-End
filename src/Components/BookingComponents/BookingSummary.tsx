import { Booking } from "../../Models/Booking";
import Moment from "react-moment";

/* If booking poosibly is undefined, don't use, but if it finds booking, collect data 
   , Also use a function to delete a reservation 
*/
interface IBookingSummaryProps {
  booking?: Booking;
}

// Component that show customer all the booking info about his/her reservation
export const BookingSummary = (props: IBookingSummaryProps) => {
  return (
    <>
      <div className="summaryContainer">
        <div className="bookingDetails">
          <div className="bookingRefAndDate">
            <ul>
              <li>
                <b>Booking reference: </b> {props.booking?.bookingRef}
              </li>
              <li>
                <b>Date: </b>
                <Moment format="YYYY/MM/DD">{props.booking?.date}</Moment>
              </li>
            </ul>
          </div>

          <div className="amountAndTime">
            <ul>
              <li>
                <b>Amount of guests booked:</b> {props.booking?.guestAmount}
              </li>
              <li>
                <b>Seating time:</b> {props.booking?.seatingTime}
              </li>
            </ul>
          </div>
        </div>
        <div className="customerInfoContainer">
          <h5>Customer info: </h5>
          <ul>
            <li>
              <b>Firstname: </b> {props.booking?.customerInfo.firstName}
            </li>
            <li>
              <b>Lastname: </b> {props.booking?.customerInfo.lastName}
            </li>
            <li>
              <b>Email: </b> {props.booking?.customerInfo.email}
            </li>
            <li>
              <b>Phone number: </b> {props.booking?.customerInfo.tel}
            </li>
            <li>
              <b>Additional info: </b>{" "}
              {props.booking?.customerInfo.additionalInfo}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
