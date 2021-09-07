interface IAddSeatingTime {
  addSeatingTime(seatingTime: string): void;
  availability: Boolean;
}

export const EarlyAvailable = (props: IAddSeatingTime) => {
  const onValueChange = () => {
    props.addSeatingTime("early");
  };

  return (
    <div
      className={`seating ${props.availability ? "available" : "full"}`}
      onClick={onValueChange}
    >
      18.00
    </div>
  );
};