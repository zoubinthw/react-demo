import React from "react";

export default function Input({title, value, setValue}){

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    return(
        <>
            <label>{title}
                <input value={value} onChange={handleChange}></input>
            </label>
        </>
    );
}