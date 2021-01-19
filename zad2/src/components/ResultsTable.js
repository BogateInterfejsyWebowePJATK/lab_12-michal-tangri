import React from "react";

export default function ResultsTable({ values }) {
    return (
        <table style={{border: "1px solid black", textAlign: "center"}}>
            <thead>
                <tr>
                    <td><b>Name</b></td>
                    <td><b>Value</b></td>
                </tr>
            </thead>
            <tbody>
                {
                    Object.keys(values).map((key, i) => { return <tr key={i} style={{border: "1px solid black"}}><td>{key}</td><td><i>{values[key]}</i></td></tr> })
                }
            </tbody>
        </table>
    );
}