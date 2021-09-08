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

  //Loading animation
  const LoadingDot = {
    display: "block",
    width: "2rem",
    height: "2rem",
    backgroundColor: "black",
    borderRadius: "50%"
  };
  
  const LoadingContainer = {
    width: "10rem",
    height: "5rem",
    display: "flex",
    justifyContent: "space-around"
  };
  
  const ContainerVariants = {
    initial: {
      transition: {
        staggerChildren: 0.2
      }
    },
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const DotVariants = {
    initial: {
      y: "0%"
    },
    animate: {
      y: "100%"
    }
  };
  
  const DotTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: "easeInOut"
  };

  return (
    <>
      <div className="userFormContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="firstName">First name *</label>
          <input
            {...register("firstName", { required: true })}
            type="text"
            id="firstName"
            name="firstName"
          />
          {errors.firstName && "First name is required"}
          <label htmlFor="lastname">Last name *</label>
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
          <input type="submit" />
        </form>
      </div>
 
       {/* <div
        style={{
          paddingTop: "5rem",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <motion.div
          style={LoadingContainer}
          variants={ContainerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.span
            style={LoadingDot}
            variants={DotVariants}
            transition={DotTransition}
          />
          <motion.span
            style={LoadingDot}
            variants={DotVariants}
            transition={DotTransition}
          />
          <motion.span
            style={LoadingDot}
            variants={DotVariants}
            transition={DotTransition}
          />
        </motion.div>
      </div> */}
    </>

    
    

  );
};
