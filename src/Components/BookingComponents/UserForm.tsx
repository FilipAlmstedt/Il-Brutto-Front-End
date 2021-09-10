import { useForm, SubmitHandler } from "react-hook-form";
import { CustomerInfo } from "../../Models/CustomerInfo";

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

    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstName">Förnamn *</label>
        <input
          {...register("firstName", { required: true })}
          type="text"
          id="firstName"
          name="firstName"
        />
        <p className="errorMsg">{errors.firstName && "First name is required"}</p>
        <label htmlFor="lastname">Efternamn *</label>
        <input
          {...register("lastName", { required: true })}
          type="text"
          id="lastName"
          name="lastName"
        />
        <p className="errorMsg">{errors.lastName && "Last name is required"}</p>
        <label htmlFor="firstName">Email *</label>
        <input
          {...register("email", { required: true })}
          type="email"
          id="email"
          name="email"
        />
        <p className="errorMsg">{errors.email && "Email is required"}</p>
        <label htmlFor="tel">Telefon *</label>
        <input
          {...register("tel", { required: true })}
          type="number"
          id="tel"
          name="tel"
        />
        <p className="errorMsg">{errors.tel && "Phone number is required"}</p>
        <label htmlFor="additionalinfo">Övrig information</label>
        <textarea
          {...register("additionalInfo")}
          name="additionalInfo"
          id="additionalInfo"
        ></textarea>
        <p>* = måste fyllas i</p>
        <button className="primaryButton" type="submit">Lägg till</button>
      </form>
    </>
  );
};
