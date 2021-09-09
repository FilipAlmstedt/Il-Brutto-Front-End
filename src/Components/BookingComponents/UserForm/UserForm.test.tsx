import {
  act,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { BookingPage } from "../../Pages/BookingPage";
 import { UserForm } from "./UserForm";

 let mockFunction = jest.fn();

test("Should render userform", () => {
  const { getByText } = render(<UserForm addCustomerInfo={mockFunction} />);
  const heading = getByText(/Please enter your information below/i);
  expect(heading).toBeInTheDocument();
});

test("Send values from form", async () => {
  render(<BookingPage/>);

  let firstname = screen.getByLabelText(/First name */i);
  let lastname = screen.getByLabelText(/Last name */i);
  let email = screen.getByLabelText(/Email */i);
  let tel = screen.getByLabelText(/Phone number */i);

  await act(async () => {
    fireEvent.change(firstname, {
      target: { name: "firstName", value: "Edvin" },
    });
    fireEvent.change(lastname, {
      target: { name: "lastName", value: "Sjögren" },
    });
    fireEvent.change(email, {
      target: { name: "email", value: "esfed20s@gmail.com" },
    });
    fireEvent.change(tel, { target: { name: "tel", value: 123 } });
  });

  
    
    await act(async () => {
      let button = screen.getByText(/Submit/i);
      button.click()
     

      // expect(mockFunction).toHaveBeenCalledWith({
      //   firstname: "Edvin",
      //   lastname: "Sjögren",
      //   email: "esfed20s@gmail.com",
      //   tel: 123,
     // });
    }); 
    //expect(mockFunction).toHaveBeenCalled();
});
