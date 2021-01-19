import './App.css';

import { useState } from "react";

import Form from "./components/Form";

function App() {
    return (
        <div className="container" style={{"width":"300px"}}>
            <div className="row">
                <div className="col-md-12">
                    <Form />
                </div>
            </div>
        </div>
    );
}

export default App;
