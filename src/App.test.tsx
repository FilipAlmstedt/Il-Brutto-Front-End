import React from "react";
import { fireEvent, getByText, render, screen } from "@testing-library/react";
import { HomePage } from "./Components/Pages/HomePage";
import { AdminBookingTable } from "./Components/AdminComponents/AdminBookingTable";
import { UserForm } from "./Components/BookingComponents/UserForm";
import { CustomerInfo } from "./Models/CustomerInfo";

test("renders home page", () => {
  const { getByText } = render(<HomePage />);
  const h1 = getByText(/Il Brutto/i);
  expect(h1).toBeInTheDocument();
});

test("Should have 0 bookings", () => {
  const { container } = render(
    <AdminBookingTable
      bookings={[]}
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
  const button = getByText(/UPDATE CUSTOMER INFORMATION/i);
  button.click()
});
