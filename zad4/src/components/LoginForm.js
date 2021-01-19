import React, { useState } from "react";
import { useInput } from "../hooks"

import UserTable from "./UserTable";

export default function LoginForm ({ usersData }) {

    const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    const [errors, setErrors] = useState({ email: "", password: "" });
    const [showSuccess, setShowSucces] = useState(false);
    const [emailBug, setEmail] = useState("")

    const [emailField, resetInputField] = useInput("");
    const [passwordField, resetPasswordField] = useInput("");

    const onSubmit = e => {
        e.preventDefault()
        const isEmailValid = emailRegex.test(emailField.value);

        if(isEmailValid) {
            
            const isEmailCorrect = Object.keys(usersData).includes(emailField.value);
            
            if (isEmailCorrect) {
                if (usersData[emailField.value].password !== passwordField.value) {
                    setErrors({ password: "Provided password is incorrect." });
                } else {
                    setShowSucces(true);
                    setErrors({ email: "", password: "" });
                    resetInputField();
                    resetPasswordField();
                    setEmail(emailField.value);
                }

            } else {
                setErrors({ email: "Account with this e-mail address does not exist." });
            }

        } else {
            setErrors({ email: "E-mail address is invalid." });
        }
    };

    return (
        <>
        <h1>Sign in form</h1>
        <form onSubmit={onSubmit}>
            { showSuccess ? <div className="alert alert-success">Sign in successful</div> : <></>}
            <div className="form-group">
                <input {...emailField} className="form-control" type="text" placeholder="Enter your e-mail address" required />
                <small style={{color: "red"}}>{errors.email}</small>
            </div>
            <div className="form-group">
                <input  {...passwordField} className="form-control" type="password" placeholder="Enter your password" required />
                <small style={{color: "red"}}>{errors.password}</small>
            </div>
            <div className="form-group">
                <button className="btn btn-primary" style={{width: "100%"}}>Sign in</button>
            </div>
        </form>
        { showSuccess ? <UserTable email={emailBug} userInfo={usersData[emailBug]} /> : <></>}
        </>
    );
}