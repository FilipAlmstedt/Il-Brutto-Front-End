import { useEffect, useState } from "react";
import Calendar from "react-calendar";

interface IAddChosenDate {
    addChosenDate (
        chosenDate: Date,
    ): void;
}

export const AdminCalendarPlugin = (props: IAddChosenDate) => {

    const [chosenDate, setChosenDate] = useState(new Date());
   
    // Send correct date everytime the user clicks on a different date
    useEffect(() => {
        props.addChosenDate(chosenDate);
    }, [chosenDate])

    return (
        <>
        <div className="calendar-plugin">
        <h1>Admin Bookings Page</h1>
            <Calendar onChange={setChosenDate} showWeekNumbers value={chosenDate} />      
        </div>
        </>
    );
}