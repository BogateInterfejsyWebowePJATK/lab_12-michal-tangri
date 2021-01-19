import React from "react";

export default function Input({ fieldState, type, placeholder, className}) {
    return (
        <input {...fieldState} className={className} type={type} placeholder={placeholder} />
    );
}