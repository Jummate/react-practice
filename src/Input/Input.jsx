import React from "react";
import './Input.css';

const Input = ({type='text', placeholder, value, onChange, label, name}) => {

    return(
        <div className="input-wrapper">
            <label htmlFor="">{label}</label>
            <input type={type} name={name} placeholder={placeholder} defaultValue={value} onChange={onChange} className='input'/>
        </div>
        
    );
}
export default Input;