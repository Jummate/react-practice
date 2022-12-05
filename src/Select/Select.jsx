import React from "react";
import './Select.css';



const Select = ({id, name, optionItem, value, label, placeholder, onChange}) => {

    return(
        <div className="select-wrapper">
            <label htmlFor={id}>{label}</label>
            <select name={name} id={id} onChange={onChange} className='select' defaultValue={value}>
                <option value="">{placeholder}</option>
                {optionItem && optionItem.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
           
        </div>
    )
}

export default Select;