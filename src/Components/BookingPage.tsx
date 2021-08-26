import { CalendarPlugin } from "./BookingComponents/CalendarPlugin";
import { BookingSummary } from "./BookingComponents/BookingSummary";
import { UserForm } from "./BookingComponents/UserForm";

const getDateAndGuestAmount = (chosenDate: Date, guestAmount: number) => {

}

export const BookingPage = () => {
  return (
    <>
      <CalendarPlugin getUserInput={getDateAndGuestAmount}></CalendarPlugin>
      {/* <UserForm></UserForm>
      <BookingSummary></BookingSummary> */}
    </>
  );
};
