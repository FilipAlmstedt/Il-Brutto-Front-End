interface IAddSeatingTime {
  addSeatingTime(seatingTime: string): void;
  availability: Boolean;
}
//send user seating time to parent state
export const LateSeating = (props: IAddSeatingTime) => {
  const onValueChange = () => {
    props.addSeatingTime("late");
  };

  return (
    <div
    //Change class on div depending on parent boolean
      className={`seating ${props.availability ? "available" : "full"}`}
      onClick={onValueChange}
    >
      21:00
    </div>
  );
};