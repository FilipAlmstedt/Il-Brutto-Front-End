import { useForm, SubmitHandler } from "react-hook-form";
import { CustomerInfo } from "../../../Models/CustomerInfo";

//import interface from parent
interface IAddCustomerInfo {
  addCustomerInfo(customerInfo: CustomerInfo): void;
}

// declare interface for react hook form
interface IUserInfo {
  firstName: string;
  lastName: string;
  email: string;
  tel: number;
  additionalInfo: string;
}

export const UserForm = (props: IAddCustomerInfo) => {
  // declare object which handles validation and error msgs, using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserInfo>();

  const onSubmit: SubmitHandler<IUserInfo> = (data) => {
    //convert data input from form into props and send to parent component
    const customerInformation: CustomerInfo = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        tel: data.tel,
        additionalInfo: data.additionalInfo,
      };
      props.addCustomerInfo(customerInformation);  
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4>Please enter your information below</h4>
      <label htmlFor="firstName">First name *</label>
      <input
        {...register("firstName", { required: true })}
        type="text"
        id="firstName"
        name="firstName"
      />
      {errors.firstName && "First name is required"}
      <label htmlFor="lastName">Last name *</label>
      <input
        {...register("lastName", { required: true })}
        type="text"
        id="lastName"
        name="lastName"
      />
      {errors.lastName && "Last name is required"}
      <label htmlFor="firstName">Email *</label>
      <input
        {...register("email", { required: true })}
        type="email"
        id="email"
        name="email"
      />
      {errors.email && "Email is required"}
      <label htmlFor="tel">Phone number *</label>
      <input
        {...register("tel", { required: true })}
        type="number"
        id="tel"
        name="tel"
      />
      {errors.tel && "Phone number is required"}
      <label htmlFor="additionalinfo">Additional info</label>
      <textarea
        {...register("additionalInfo")}
        name="additionalInfo"
        id="additionalInfo"
      ></textarea>
      <p>* = required</p>
      <button type="submit">Submit</button>
    </form>
  );
};