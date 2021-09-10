interface IAddSeatingTime {
  addSeatingTime(seatingTime: string): void;
  availability: Boolean;
}
//send user seating time to parent state
export const EarlySeating = (props: IAddSeatingTime) => {
  const onValueChange = () => {
    props.addSeatingTime("early");
  };

  return (
    <div
      //Change class on div depending on parent boolean
      className={`seating ${props.availability ? "available" : "full"}`}
      onClick={onValueChange}
    >
      18.00
    </div>
  );
};