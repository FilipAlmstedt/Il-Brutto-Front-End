import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export function CalendarPlugin() {
  const [value, onChange] = useState(new Date());
  let selectedDate = JSON.stringify(value);

  return (
    <>
      <h1>CalendarPlugin works!</h1>
      <div style={{ width: 700 }}>
        <Calendar onChange={onChange} showWeekNumbers value={value} />
        <p> You selected {selectedDate}</p>
      </div>
    </>
  );
}
