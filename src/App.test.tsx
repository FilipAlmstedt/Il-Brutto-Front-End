import React from "react";
import {
  fireEvent,
  getByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { HomePage } from "./Components/Pages/HomePage";
import { AdminBookingTable } from "./Components/AdminComponents/AdminBookingTable/AdminBookingTable";
import { UserForm } from "./Components/BookingComponents/UserForm/UserForm";
import { CustomerInfo } from "./Models/CustomerInfo";




// test("Should have 0 bookings", () => {
//   const { container } = render(
//     <AdminBookingTable
//       bookings={mockData}
//       cancelReservation={function (bookingRef?: string): void {
//         throw new Error("Function not implemented.");
//       }}
//     />
//   );
//   const liTags = container.querySelector("li").length;
//   expect(liTags.toBe(0));
// });
