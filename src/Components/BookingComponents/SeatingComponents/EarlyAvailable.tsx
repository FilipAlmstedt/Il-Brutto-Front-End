interface IAddSeatingTime {
  addSeatingTime(seatingTime: string): void;
}

export const EarlyAvailable = (props: IAddSeatingTime) => {
  const onValueChange = () => {
    props.addSeatingTime("early");
  };

  return (
    <div className="seating available" onClick={onValueChange}>
      18.00
    </div>
  );
};
