import React from "react";
import { fireEvent, getByText, render, screen } from "@testing-library/react";
import { HomePage } from "./Components/Pages/HomePage";
import { AdminBookingTable } from "./Components/AdminComponents/AdminBookingTable";
import { UserForm } from "./Components/BookingComponents/UserForm";
import { CustomerInfo } from "./Models/CustomerInfo";
import axios from "axios"
import { Booking } from "./Models/Booking";
jest.mock("axios")

const mockAxios = axios as jest.Mocked<typeOf axios>;
const mockData: Booking[] = [{date: new Date}]

test("Bookings should have correct number of bookings", ()=> {
  mockAxios.get.mockResolvedValues({data: mockData})

  render (<AdminBookingTable bookings={[]} cancelReservation={function (bookingRef?: string): void {
    throw new Error("Function not implemented.");
  } }/>)

  await waitFor(()=>{
    const bookings = screen.getAllByRole("heading");
  expect(bookings.length.toBe(mockData.length))
  })
  
})


test("renders home page", () => {
  const { getByText } = render(<HomePage />);
  const h1 = getByText(/Il Brutto/i);
  expect(h1).toBeInTheDocument();
});

test("Should have 0 bookings", () => {
  const { container } = render(
    <AdminBookingTable
      bookings={[
        {date: new Date, bookingRef: "abc123", guestAmount: 2, seatingTime: "early", CustomerInfo {
          firstname: "Edvin", lastname: "Sjögren", 
        }}
      ]}
      cancelReservation={function (bookingRef?: string): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
  const liTags = container.querySelector("li").length;
  expect(liTags.toBe(0));
});

test("Add booking works", () => {
  const { getByPlaceholderText } = render(
    <UserForm
      addCustomerInfo={function (customerInfo: CustomerInfo): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
  const input = getByPlaceholderText("New Booking")
  fireEvent.change(input, {target: {value: "Lorem Ipsum"}})
  const button = getByText(/UPDATE/i);
  button.click()
});



