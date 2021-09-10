import { ChangeEvent } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface ICalendarPluginProps {
  getDate(chosenDate: Date): void;
  getGuestAmount(guestAmount: number): void;
}

export function CalendarPlugin(props: ICalendarPluginProps) {
  
  //send user guestamount input to parent state
  const submitGuestAmount = (e: ChangeEvent<HTMLInputElement>) => {
    props.getGuestAmount(+e.target.value);
  };

  //send user selected date input to parent state
  const submitDate = (e: Date) => {
    props.getDate(e);
  };

  return (
    <>
      <label htmlFor="guestAmount">Gästantal: </label>
      <input
        id="guestAmount"
        onChange={submitGuestAmount}
        type="number"
        defaultValue={2}
        min={1}
        max={12}
      />

      <Calendar onChange={submitDate} minDate={new Date()} showWeekNumbers />
    </>
  );
}
