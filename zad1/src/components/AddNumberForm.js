import React from "react";

export default function AddNumberForm({ numberRef, onSubmit = f => f}) {
    return (
        <form onSubmit={onSubmit}>
            <input ref={numberRef} type="number" placeholder="Enter a number" required/>
            <button>Add this number</button>
        </form>
    )
}