import { useState, ChangeEvent, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface ICalendarPluginProps {
  getUserInput(chosenDate: Date, guestAmount: number): void;
}



export function CalendarPlugin(props: ICalendarPluginProps) {
  const [chosenDate, setChosenDate] = useState(new Date());
  const [guestAmount, setGuestAmount] = useState(0);

  useEffect(() => {
    props.getUserInput(chosenDate, guestAmount);
   },[chosenDate, guestAmount]);

  const submitGuestAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setGuestAmount(+e.target.value)
    
  };

  return (
    <>
      <h1>CalendarPlugin works!</h1>
      <div style={{ width: 700 }}>
        <label htmlFor="guestAmount">Guest amount: </label>
        <input
          id="guestAmount"
          onChange={submitGuestAmount}
          type="number"
          defaultValue={1}
          min={1}
          placeholder="Type in amount of guests"
        />

        <Calendar onChange={setChosenDate}  showWeekNumbers value={chosenDate} />
      </div>
    </>
  );
}
