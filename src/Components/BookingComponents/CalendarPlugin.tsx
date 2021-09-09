import { useState, ChangeEvent, useEffect } from "react";
import Calendar, { OnChangeDateRangeCallback } from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface ICalendarPluginProps {
  getUserInput(chosenDate: Date, guestAmount: number): void;
  // getUserAmount(guestAmount: number): void;
}

export function CalendarPlugin(props: ICalendarPluginProps) {
  const [chosenDate, setChosenDate] = useState(new Date());
  const [guestAmount, setGuestAmount] = useState<number>(2);

  useEffect(() => {
    props.getUserInput(chosenDate, guestAmount);
  }, [chosenDate, guestAmount]);

  // useEffect(() => {
  //   props.getUserAmount(guestAmount);
  // }, [guestAmount]);


  const submitGuestAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setGuestAmount(+e.target.value)
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

      <Calendar onChange={setChosenDate} minDate={new Date()} showWeekNumbers value={chosenDate} />
    </>
  );
}