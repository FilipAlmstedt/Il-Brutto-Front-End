import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { Booking } from "../../../Models/Booking";
import { MockBookingArray } from "../../../__mocks__/MockBookingArray";
import { AdminBookingTable } from "./AdminBookingTable";
import { MemoryRouter } from "react-router-dom";
import { AdminPage } from "../../Pages/AdminPage";

jest.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;

//En lista med tre förbestämda objekt
const mockDataArray: Booking[] = MockBookingArray;

let mockFunction = jest.fn();

test("Should render booking table", () => {
  const { getByText } = render(
    <MemoryRouter>
      <AdminBookingTable
        bookings={mockDataArray}
        cancelReservation={mockFunction}
      />
    </MemoryRouter>
  );
  const heading = getByText(/Bookings/i);
  expect(heading).toBeInTheDocument();
});

test("Bookings should have correct number of bookings", async () => {
  mockAxios.get.mockResolvedValue({ data: mockDataArray });

  render(
    <MemoryRouter>
      <AdminBookingTable
        bookings={mockDataArray}
        cancelReservation={mockFunction}
      />
    </MemoryRouter>
  );

  await waitFor(() => {
    const bookings = screen.getAllByRole("listitem");
    expect(bookings.length).toBe(mockDataArray.length);
  });
});

test("Should be able to trigger delete button", async () => {
  mockAxios.get.mockResolvedValue({ data: mockDataArray });

  render(
    <MemoryRouter>
      <AdminBookingTable
        bookings={mockDataArray}
        cancelReservation={mockFunction}
      />
    </MemoryRouter>
  );

  await waitFor(() => {
    const bookings = screen.getAllByRole("listitem");
    expect(bookings.length).toBe(mockDataArray.length);
    const buttons = screen.getAllByText(/X/i);

    fireEvent.click(buttons[0]);
    expect(mockFunction).toHaveBeenCalled();
  });
});

test("Should be able to make a delete request", async () => {
  mockAxios.get.mockResolvedValue({ data: mockDataArray });
  mockAxios.delete.mockResolvedValue({ data: mockDataArray[0].bookingRef });

  const { container } = render(
    <MemoryRouter>
      <AdminPage></AdminPage>
    </MemoryRouter>
  );

  await waitFor( () => {
    let myLis = container.querySelectorAll("li").length;
    expect(myLis).toBe(3);

    const buttons = screen.getAllByText(/X/i);
    buttons[0].click();

    expect(mockAxios.delete).toHaveBeenCalledWith(
      "http://localhost:8000/admin/delete/abc123"
    );

    // waitFor(() => {
    //   let myNewLis = container.querySelectorAll("li").length;
    //   expect(myNewLis).toBe(2);
    //   console.log(myNewLis); 
    // });
  });
});