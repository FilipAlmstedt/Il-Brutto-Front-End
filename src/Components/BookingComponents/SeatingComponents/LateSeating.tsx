interface IAddSeatingTime {
  addSeatingTime(seatingTime: string): void;
  availability: Boolean;
}

export const LateSeating = (props: IAddSeatingTime) => {
  const onValueChange = () => {
    props.addSeatingTime("late");
  };

  return (
    <div
      className={`seating ${props.availability ? "available" : "full"}`}
      onClick={onValueChange}
    >
      21:00
    </div>
  );
};