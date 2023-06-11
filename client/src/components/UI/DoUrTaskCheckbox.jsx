import React from 'react';
import './styles/checkbox.css'
import SvgCheckmark from 'components/svg/SvgCheckmark'

const DoUrTaskCheckbox = ({getInput, value, type = 'text'}) => {

    return (
        <label>
            <input type="checkbox" className="checkbox" value={value} onChange={(e) => {
                getInput(e.target.checked)}}
                defaultChecked={value}/>
            <div className="checkbox-icon">
                <div className="checkbox-icon__svg">
                    <SvgCheckmark />
                </div>
            </div>  
            
        </label>
    );
};

export default DoUrTaskCheckbox;