import { CustomerInfo } from "./CustomerInfo";
export class Booking {
  constructor(
    public date: Date,
    public bookingRef: string,
    public guestAmount: number,
    public seatingTime: string,
    public customerInfo: CustomerInfo
  ) {}
}
