import { useState } from "react";
import Input from "../input";

export default function Form(){
    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');

    function handleClick() {
        console.log(value);
    }

    function handleClick2() {
        console.log(value2);
    }

    return(
        <>
            <h1>Form Demo</h1>
            <div>
                <h3>demo 01</h3>
                <Input title="hi, Form" value={value} setValue={setValue}/>
                <Input title="hi, Form" value={value} setValue={setValue}/>
                <textarea value={value} onChange={(event) => setValue(event.target.value)}></textarea>
                <button onClick={handleClick}>submit</button>
            </div>
            <div>
                <h3>demo 02</h3>
                <Input title="hi, Form" value={value2} setValue={setValue2}/>
                <Input title="hi, Form" value={value2} setValue={setValue2}/>
                <textarea value={value2} onChange={(event) => setValue2(event.target.value)}></textarea>
                <button onClick={handleClick2}>submit2</button>
            </div>
        </>
    );
}