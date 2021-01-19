import './App.css';
import { useState, useRef } from "react";

import AddNumberForm from "./components/AddNumberForm";

function App() {
    const [sum, setSum] = useState({ value: 0, amount: 0});
    const number = useRef();

    const onSubmitAddNumber = e => {
        e.preventDefault();
        setSum({ value: sum.value + parseFloat(number.current.value), amount: ++sum.amount});
    }

    return (
        <>
            <p>Suma wynosi: {sum.value}</p>
            <p>Średnia z {sum.amount} liczb wynosi: { isNaN((sum.value/sum.amount).toFixed(2)) ? 0.00 : (sum.value/sum.amount).toFixed(2)}</p>
            <AddNumberForm numberRef={number} onSubmit={onSubmitAddNumber} />
        </>
    )
}

export default App;
