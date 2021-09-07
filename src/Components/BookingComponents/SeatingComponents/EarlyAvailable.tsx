import { useEffect } from "react";

interface IAddSeatingTime {
  addSeatingTime(seatingTime: string): void;
  availability:Boolean;
}

export const EarlyAvailable = (props: IAddSeatingTime) => {
  const onValueChange = () => {
    props.addSeatingTime("early");
  };

  useEffect(() => {
    console.log(props.availability);
    
  }, []);

  return (
    <div className={"seating available"} onClick={onValueChange}>
      18.00
    </div>
  );
};
