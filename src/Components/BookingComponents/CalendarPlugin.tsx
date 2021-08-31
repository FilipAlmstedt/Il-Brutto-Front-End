 import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

interface ICalendarPluginProps {
  getUserInput(chosenDate: Date, guestAmount: number): void
}

export function CalendarPlugin(props: ICalendarPluginProps) {
  const [chosenDate, setChosenDate] = useState(new Date());
  const [guestAmount, setGuestAmount] = useState(1);
  // Test string
  let selectedDate = JSON.stringify(chosenDate);
  //console.log(chosenDate);
  

  return (
    <>
      <h1>CalendarPlugin works!</h1>
      <div style={{ width: 700 }}>

          
          <label htmlFor="numberOfGuests">Number of guests: </label>
          {/*Collect number of guests and date from calendar plugin and send it to a different function to get results from DB*/}
          <input type="number" id="numberOfGuests" onChange={event => setGuestAmount(+event.target.value)} min="1"/>
          <Calendar onChange={setChosenDate} showWeekNumbers value={chosenDate} />
      
        <p> You selected {selectedDate}</p>
        <p> You selected {guestAmount}</p>
      </div>
    </>
  );
}