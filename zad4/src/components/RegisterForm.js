import React, { useState } from "react";
import { useInput } from "../hooks";
import validators from "../validators";
import fs from "fs";

import Input from "./Input";


export default function RegisterForm({ usersData }) {

    const [errors, setErrors] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        birthDate: "",
        file: "",
        accept: ""
    });

    const [isFormValid, setIsFormValid] = useState(false);
    const [showSuccess, setShowSucces] = useState(false);

    const [nameField, resetNameField] = useInput("");
    const [surnameField, resetSurnameField] = useInput("");
    const [emailField, resetEmailField] = useInput("");
    const [passwordField, resetPasswordField] = useInput("");
    const [birthDateField, resetBirthDateField] = useInput("");
    const [fileField, resetFileField] = useInput("");
    const [acceptField, resetAcceptField] = useInput("");

    const onChange = e => {
        const nameValid = validators.validateName(nameField.value, setErrors);
        const surnameValid = validators.validateSurname(surnameField.value, setErrors);
        const emailValid = validators.validateEmail(emailField.value, setErrors, usersData);
        var passwordValid = validators.validatePassword(passwordField.value, setErrors);
        const birthDateValid = validators.validateBirthDate(birthDateField.value, setErrors);
        const termsValid = validators.validateTerms(acceptField.value, setErrors);

        /* Z jakiegoś powodu funkcja zwracająca same booleany, zwraca czasami undefined więc zostawiam tutaj mały fix */
        passwordValid = passwordValid === undefined ? true : passwordValid;

        if (nameValid && surnameValid && emailValid && passwordValid && birthDateValid && termsValid) {
            setIsFormValid(true);
        }

    }

    const onReset = e => {
        resetNameField();
        resetSurnameField();
        resetEmailField();
        resetPasswordField();
        resetBirthDateField();
        resetFileField();
        resetAcceptField();
    }

    const onSubmit = e => {
        e.preventDefault();
        setShowSucces(true);
        onReset(null);

        const newUser = {
            name: nameField.value,
            surname: surnameField.value,
            password: passwordField.value,
            birthDate: birthDateField.value,
        }

        usersData[emailField.value] = newUser;
        /* 
            Nie udało mi się zmusić modułu 'fs' żeby zapisać dane do pliku ../data/users.json
            więc dane użytkowników resetują się po odświeżeniu aplikacji.
        */
        // const result = fs.writeFileSync('../data/users.json', usersData);
        // console.log(result)

    };

    return (
        <>
        <h1>Sign up form</h1>
        <form onSubmit={onSubmit} onChange={onChange}>
            {showSuccess ? <div className="alert alert-success">New account created!</div> : <></>}

            <div className="form-group">
                <Input fieldState={nameField} type="text" placeholder="Enter your name" className="form-control" />
                <small style={{ color: "red" }}>{errors.name}</small>
            </div>

            <div className="form-group">
                <Input fieldState={surnameField} type="text" placeholder="Enter your surname" className="form-control" />
                <small style={{ color: "red" }}>{errors.surname}</small>
            </div>

            <div className="form-group">
                <Input fieldState={emailField} type="text" placeholder="Enter your e-mail address" className="form-control" />
                <small style={{ color: "red" }}>{errors.email}</small>
            </div>

            <div className="form-group">
                <Input fieldState={passwordField} type="password" placeholder="Enter your password" className="form-control" />
                <small style={{ color: "red" }}>{errors.password}</small>
            </div>

            <div className="form-group">
                <Input fieldState={birthDateField} type="date" placeholder="" className="form-control" />
                <small style={{ color: "red" }}>{errors.birthDate}</small>
            </div>

            <div className="form-group">
                <Input fieldState={fileField} type="file" placeholder="" />
                <small style={{ color: "red" }}>{errors.file}</small>
            </div>

            <div className="form-group">
                <label><input {...acceptField} type="checkbox" value="true" />&nbsp;I accept the terms of service</label>
                <small style={{ color: "red" }}>{errors.accept}</small>
            </div>

            <div className="form-group">
                <button className="btn btn-primary" style={{ width: "100%" }} disabled={!isFormValid}>Sign up</button>
            </div>
            <div className="form-group">
                <input onClick={onReset} className="btn btn-danger" type="reset" value="Reset this form" style={{ width: "100%" }} />
            </div>
        </form>
        </>

    );
}