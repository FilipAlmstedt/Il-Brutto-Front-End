import { ChangeEvent, useState } from "react";
import { CustomerInfo } from "../../Models/CustomerInfo";

interface IAddFormInput {
  addFormInput(
    date: Date,
    bookingRef: string,
    guestAmount: number,
    seatingTime: string,
    firstName: string,
    lastName: string,
    email: string,
    tel: number,
    additionalInfo: string
  ): void;
}

interface IForm {
  //date: Date;
  bookingRef: string;
  //guestAmount: number;
  seatingTime: string;
  firstName: string;
  lastName: string;
  email: string;
  tel: number;
  additionalInfo: string;
}

export const UserForm = (props: IAddFormInput) => {
  const [form, setForm] = useState<IForm>({
    // date: new Date(),
    bookingRef: "",
    // guestAmount: 1,
    seatingTime: "",
    firstName: "",
    lastName: "",
    email: "",
    tel: 0,
    additionalInfo: "",
  });

  const updateAll = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    setForm({ ...form, [name]: e.target.value });
  };

  const submitCustomerInfo = () => {
    props.addFormInput(
      //PS - Dummy data
      new Date(),
      form.bookingRef,
      2,
      form.seatingTime,
      form.firstName,
      form.lastName,
      form.email,
      form.tel,
      form.additionalInfo
    );
  };

  console.log(form);

  return (
    <>
      <h1>UserForm works!</h1>
      <form>
        <input
          type="text"
          onChange={updateAll}
          value={form.firstName}
          name="firstName"
          placeholder="First name"
        />
        <input
          type="text"
          hidden
          name="bookingRef"
          value="abc123"
          onChange={updateAll}
        />
        <input
          type="text"
          onChange={updateAll}
          value={form.lastName}
          name="lastName"
          placeholder="Last name"
        />
        <input
          type="email"
          onChange={updateAll}
          value={form.email}
          name="email"
          placeholder="Email"
        />
        <input
          type="tel"
          onChange={updateAll}
          value={form.tel}
          name="tel"
          placeholder="Phone number"
        />

        <input
          type="text"
          onChange={updateAll}
          value={form.additionalInfo}
          name="additionalInfo"
          placeholder="Additional information"
        />
        {/*Seating input only for admin use (temporarily)*/}
        <div className="radio">
          <label>
            <input
              type="radio"
              value="early"
              name="seatingTime"
              onChange={updateAll}
            />
            Early
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              name="seatingTime"
              type="radio"
              value="late"
              onChange={updateAll}
            />
            Late
          </label>
        </div>
        <button type="button" onClick={submitCustomerInfo}>
          Submit
        </button>
      </form>
    </>
  );
};
