import { useState, ChangeEvent, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface ICalendarPluginProps {
  getUserInput(chosenDate: Date, guestAmount: number): void;

}

export function CalendarPlugin(props: ICalendarPluginProps) {
  const [chosenDate, setChosenDate] = useState(new Date());
  const [guestAmount, setGuestAmount] = useState<number>(2);

  useEffect(() => {
    props.getUserInput(chosenDate, guestAmount);
  }, [chosenDate, guestAmount]);

  const submitGuestAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setGuestAmount(+e.target.value);
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
      />

      <Calendar
        onChange={setChosenDate}
        minDate={new Date()}
        showWeekNumbers
        value={chosenDate}
      />
    </>
  );
}
