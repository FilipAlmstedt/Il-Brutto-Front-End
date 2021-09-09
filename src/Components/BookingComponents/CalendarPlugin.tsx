import { useState, ChangeEvent, useEffect } from "react";
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
      <div className="guestAmountContainer">
        <label htmlFor="guestAmount">Guest amount: </label>
        <input
          id="guestAmount"
          onChange={submitGuestAmount}
          type="number"
          defaultValue={2}
          min={1}
        />
      </div>

      <Calendar
        onChange={setChosenDate}
        minDate={new Date()}
        showWeekNumbers
        value={chosenDate}
      />
    </>
  );
}
