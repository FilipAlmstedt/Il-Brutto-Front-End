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
                <b>Bokningsreferens: </b> {props.booking?.bookingRef}
              </li>
              <li>
                <b>Datum: </b>
                <Moment format="YYYY/MM/DD">{props.booking?.date}</Moment>
              </li>
            </ul>
          </div>

          <div className="amountAndTime">
            <ul>
              <li>
                <b>Antal bokade gäster:</b> {props.booking?.guestAmount}
              </li>
              <li>
                <b>Sittningstid:</b>{" "}
                {props.booking?.seatingTime === "early" ? "18.00" : "21:00"}
              </li>
            </ul>
          </div>
        </div>
        <div className="customerDetails">
          <h5>Gästinformation: </h5>
          <ul>
            <li>
              <b>Förnamn: </b> {props.booking?.customerInfo.firstName}
            </li>
            <li>
              <b>Efternamn: </b> {props.booking?.customerInfo.lastName}
            </li>
            <li>
              <b>Email: </b> {props.booking?.customerInfo.email}
            </li>
            <li>
              <b>Telefon: </b> {props.booking?.customerInfo.tel}
            </li>
            {props.booking?.customerInfo.additionalInfo ? (
              <li>
                <b>Övrig information: </b>{" "}
                {props.booking?.customerInfo.additionalInfo}
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </>
  );
};
