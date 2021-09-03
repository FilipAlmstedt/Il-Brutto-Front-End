import { ChangeEvent, useState } from "react";
import { CustomerInfo } from "../../Models/CustomerInfo";

interface IAddCustomerInfo {
  addCustomerInfo(customerInfo: CustomerInfo): void;
}

interface IForm {
  firstName: string;
  lastName: string;
  email: string;
  tel: number;
  additionalInfo: string;
}

// Collect all the customers info and send it up to parent component AdminPage
export const UserForm = (props: IAddCustomerInfo) => {
  const defaultFormValues: IForm = {
    firstName: "",
    lastName: "",
    email: "",
    tel: 0,
    additionalInfo: "",
  };
  const [form, setForm] = useState<IForm>(defaultFormValues);

  const updateAll = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    setForm({ ...form, [name]: e.target.value });
  };

  const submitCustomerInfo = () => {
    const customerInformation: CustomerInfo = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      tel: form.tel,
      additionalInfo: form.additionalInfo,
    };
    props.addCustomerInfo(customerInformation);
  };

  return (
    <>
      <form>
        <h2>Guest information</h2>
        <label htmlFor="firstname">Firstname: </label>
        <input
          id="firstname"
          type="text"
          onChange={updateAll}
          value={form.firstName}
          name="firstName"
          placeholder="First name"
        />

        <label htmlFor="lastname">Lastname: </label>
        <input
          id="lastname"
          type="text"
          onChange={updateAll}
          value={form.lastName}
          name="lastName"
          placeholder="Last name"
        />

        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="email"
          onChange={updateAll}
          value={form.email}
          name="email"
          placeholder="Email"
        />

        <label htmlFor="telnumber">Telephone number: </label>
        <input
          id="telnumber"
          type="tel"
          onChange={updateAll}
          value={form.tel}
          name="tel"
          placeholder="Phone number"
        />

        <label htmlFor="additionalInfo">Additional information: </label>
        <input
          id="additionalInfo"
          type="text"
          onChange={updateAll}
          value={form.additionalInfo}
          name="additionalInfo"
          placeholder="Additional information"
        />
        <button type="button" onClick={submitCustomerInfo}>
          UPDATE CUSTOMER INFORMATION
        </button>
      </form>
    </>
  );
};
