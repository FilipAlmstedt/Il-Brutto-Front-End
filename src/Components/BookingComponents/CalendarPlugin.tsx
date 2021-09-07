<<<<<<< HEAD
import { useState } from "react";
=======
import { useState, ChangeEvent, useEffect } from "react";
>>>>>>> 1181d884829cac85b8e4a2cfdc515347ad657a76
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface ICalendarPluginProps {
  getUserDate(chosenDate: Date): void;
  getUserAmount(guestAmount: number): void;
}

export function CalendarPlugin(props: ICalendarPluginProps) {
  const [chosenDate, setChosenDate] = useState(new Date());

  useEffect(() => {
    props.getUserDate(chosenDate);
  }, [chosenDate]);

  const submitGuestAmount = (e: ChangeEvent<HTMLInputElement>) => {
    props.getUserAmount(+e.target.value);
  };

  return (
    <>
      <label htmlFor="guestAmount">Guest amount: </label>
      <input
        id="guestAmount"
        onChange={submitGuestAmount}
        type="number"
        defaultValue={1}
        min={1}
      />

      <Calendar onChange={setChosenDate} showWeekNumbers value={chosenDate} />
    </>
  );
}
