import { CalendarPlugin } from "./BookingComponents/CalendarPlugin";
import { BookingSummary } from "./BookingComponents/BookingSummary";
import { UserForm } from "./BookingComponents/UserForm";

export const BookingPage = () => {
  return (
    <>
      <h1>Bookingpage works!</h1>
      <CalendarPlugin></CalendarPlugin>
      <UserForm></UserForm>
      <BookingSummary></BookingSummary>
    </>
  );
};
