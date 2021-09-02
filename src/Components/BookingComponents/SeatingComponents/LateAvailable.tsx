interface IAddSeatingTime {
  addSeatingTime(seatingTime: string): void;
}

export const LateAvailable = (props: IAddSeatingTime) => {
  const onValueChange = () => {
    props.addSeatingTime("late");
  };

  return (
    <div className="seating available" onClick={onValueChange}>
      {" "}
      21:00
    </div>
  );
};
