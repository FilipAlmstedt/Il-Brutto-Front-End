import {
  fireEvent,
  getByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import axios from "axios";
import { Booking } from "../../../Models/Booking";
import { MockBookingArray } from "../../../__mocks__/MockBookingArray";
import { AdminBookingTable } from "./AdminBookingTable";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;
const mockData: Booking[] = MockBookingArray;
let mockFunction = jest.fn();

test("Should render booking table", () => {
  const { getByText } = render(
    <MemoryRouter>
      <AdminBookingTable bookings={mockData} cancelReservation={mockFunction} />
    </MemoryRouter>
  );
  const heading = getByText(/Bookings/i);
  expect(heading).toBeInTheDocument();
});

test("Bookings should have correct number of bookings", async () => {
  mockAxios.get.mockResolvedValue({ data: mockData });

  render(
    <MemoryRouter>
      <AdminBookingTable bookings={mockData} cancelReservation={mockFunction} />
    </MemoryRouter>
  );

  await waitFor(() => {
    const bookings = screen.getAllByRole("listitem");
    expect(bookings.length).toBe(mockData.length);
  });
});

test("Should be able to trigger delete button", async () => {
  mockAxios.get.mockResolvedValue({ data: mockData });

  render(
    <MemoryRouter>
      <AdminBookingTable bookings={mockData} cancelReservation={mockFunction} />
    </MemoryRouter>
  );

  await waitFor(() => {
    const buttons = screen.getAllByText(/X/i);
    for (let i = 0; i < buttons.length; i++) {
      fireEvent.submit(buttons[i]);
      return;
    }
    expect(mockFunction).toHaveBeenCalled;
  });
});

test("Should be able to delete a booking", async () => {
  mockAxios.get.mockResolvedValue({ data: mockData });

  render(
    <MemoryRouter>
      <AdminBookingTable
        bookings={mockData}
        cancelReservation={mockFunction}
      />
    </MemoryRouter>
  );

  await waitFor(() => {
    const buttons = screen.getAllByText(/X/i);
    for (let i = 0; i < buttons.length; i++) {
      fireEvent.submit(buttons[i]);
    }
    expect(mockFunction).toHaveBeenCalled;
    const bookings = screen.getAllByRole("listitem");
    expect(bookings.length).toBe(2);
  });
});
