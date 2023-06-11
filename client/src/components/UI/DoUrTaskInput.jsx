import React from 'react';
import './styles/input.css'

const DoUrTaskInput = ({placeholder, getInput, value, isError = false, type = 'text'}) => {
    const getInputClass = () => {
        return (isError ? 'input input-error' : 'input');
    }
    return (
        <div>
            <input type={type} placeholder={placeholder} className={getInputClass()} value={value} onChange={(e) => getInput(e.target.value)}/>  
        </div>
    );
};

export default DoUrTaskInput;