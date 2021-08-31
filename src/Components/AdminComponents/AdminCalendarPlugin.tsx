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
        <div style={{ width: 700 }}>
            <Calendar onChange={setChosenDate} showWeekNumbers value={chosenDate} />      
        </div>
        </>
    );
}