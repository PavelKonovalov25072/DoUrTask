import React from 'react';
import './styles/button.css'

const DoUrTaskButton = ({name, onClick, bgColor}) => {
    const getClass = () => {
        if (bgColor !== undefined) return 'button button-red'
        return 'button'
    }
    return (
        <div>
            <button className={getClass()} onClick={onClick}>{name} </button>
        </div>
    );
};

export default DoUrTaskButton;