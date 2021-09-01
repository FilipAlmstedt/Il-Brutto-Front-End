import { ChangeEvent, useState } from "react";

interface IAddSeatingTime {
  addSeatingTime(seatingTime: string): void;
}

// Collect seating times early or late in a form and send up to parent
export const AdminSeatingTime = (props: IAddSeatingTime) => {

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    let selectedTime = e.target.value;
    props.addSeatingTime(selectedTime);
  };

  return (
    <>
     
        <div className="radio">
          <label>
            <input
              id="early"
              type="radio"
              value="early"
              name="seatingTime"
              onChange={onValueChange}
            />
            Early
          </label>

          <label>
            <input
              id="late"
              name="seatingTime"
              type="radio"
              value="late"
              onChange={onValueChange}
            />
            Late
          </label>
        </div>
     
    </>
  );
};
