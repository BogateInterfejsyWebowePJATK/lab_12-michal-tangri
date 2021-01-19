import React, { useState } from "react";
import { useInput } from "../hooks";

import ResultsTable from "./ResultsTable"

export default function Form() {
    const [showTable, setShowTable] = useState(false);

    const [firstInput, resetFirstInput] = useInput("");
    const [secondInput, resetSecondInput] = useInput("");
    const [radio, resetRadio] = useInput();
    const [select, resetSelect] = useInput();
    const [checkbox, resetCheckbox] = useInput("");

    const resetForm = () => {
        resetFirstInput()
        resetSecondInput()
        resetRadio()
        resetSelect()
        resetCheckbox()
        setShowTable(false)
    };

    const onSubmit = e => {
        e.preventDefault();
        setShowTable(true)

        console.log(firstInput)
        console.log(secondInput)
        console.log(radio)
        console.log(select)
        console.log(checkbox)
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input {...firstInput} className="form-control" type="text" placeholder="Enter first text" required />
                    <input {...secondInput} className="form-control" type="text" placeholder="Enter second text" required />
                </div>
                <div className="form-group">
                    <label><input {...radio} id="radio" type="radio" value="Zaznaczony" />&nbsp;Zaznacz mnie</label>
                </div>
                <div className="form-group">
                    <select {...select} className="form-control">
                        <option valie="BIU">Bogate Interfejsy Użytkownika</option>
                        <option valie="BSI">Bezpieczeństwo Systemów Informacyjnych</option>
                        <option valie="NAI">Narzędzia Sztucznej Inteligencji</option>
                    </select>
                </div>
                <div className="form-group">
                    <label><input {...checkbox} type="checkbox" value="Zaznaczony" />&nbsp;Zaznacz mnie</label>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-success" value="Submit this form" style={{width: "100%"}} />
                </div>
                <div className="form-group">
                    <input type="reset" className="btn btn-danger" onClick={resetForm} value="Reset this form" style={{width: "100%"}} />
                </div>
                
            </form>
            { showTable ? <ResultsTable values={{ "FirstInput": firstInput.value, "SecondInput": secondInput.value, "Radio": radio.value, "Select": select.value, "Checkbox": checkbox.value }} /> : <></>}
        </>
    );
}