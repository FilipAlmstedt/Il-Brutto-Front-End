import { ChangeEvent, useState } from "react";

interface IAddSeatingTime{
    addSeatingTime(
        seatingTime: string,
    ): void;
}

interface IForm {
    seatingTime: string
}

// Collect seating times early or late in a form and send up to parent 
export const AdminSeatingTime = (props: IAddSeatingTime)  => {

    const defaultValue: IForm = {seatingTime: ""};
    const [form, setForm] = useState<IForm>(defaultValue);

    // FIXA SÅ DEN LAGRAR RÄTT SEATINGTIME. NU LAGRAR DEN TVÄRT OM!!!!!!
    const updateAll = (e: ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name;
        setForm({ ...form, [name]: e.target.value });
        
        props.addSeatingTime(form.seatingTime);
    };



    return (
        <>
            <form>
                <div className="radio">
                    <label>
                        <input
                        id="early"
                        type="radio"
                        value="early"
                        name="seatingTime"        
                        onChange={updateAll}
                        />
                        Early
                    </label>
                
                    <label>
                        <input
                        id="late"
                        name="seatingTime"
                        type="radio"
                        value="late"
                        onChange={updateAll}
                        />
                        Late
                    </label>
                </div>
            </form>
        </>
    );
}