import { ChangeEvent } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface ICalendarPluginProps {
  getDate(chosenDate: Date): void;
  getGuestAmount(guestAmount: number): void;
}

export function CalendarPlugin(props: ICalendarPluginProps) {
  
  const submitGuestAmount = (e: ChangeEvent<HTMLInputElement>) => {
    props.getGuestAmount(+e.target.value);
  };

  const submitDate = (e: Date) => {
    props.getDate(e);
  };

  return (
    <>
      <label htmlFor="guestAmount">Guest amount: </label>
      <input
        id="guestAmount"
        onChange={submitGuestAmount}
        type="number"
        defaultValue={2}
        min={1}
      />

      <Calendar onChange={submitDate} minDate={new Date()} showWeekNumbers />
    </>
  );
}
