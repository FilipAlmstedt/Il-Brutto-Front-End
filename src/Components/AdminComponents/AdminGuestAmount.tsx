import { ChangeEvent, useState } from "react";

interface IAddGuestAmount {
    addGuestAmount(
        guestAmount: number
    ): void;
}

// Component that stores guest amount and send to parent AdminPage
export const AdminGuestAmount = (props: IAddGuestAmount) => {

    const submitGuestAmount = (e: ChangeEvent<HTMLInputElement>) => {
        props.addGuestAmount(+e.target.value);
    }

    return (
        <>
            <label htmlFor="guestAmount">Guest amount: </label>
            <input id="guestAmount" onChange={submitGuestAmount} type="number" defaultValue={1} min={1} placeholder="Type in amount of guests"/>
        </>
    );

} 