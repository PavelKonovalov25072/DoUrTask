import React from 'react';
import './styles/task-text.css'

const DoUrTaskText = ({title, width, height}) => {
    return (
        <div className='task-text' style={{width: width, height: height}}>
            { title }
        </div>
    );
};

export default DoUrTaskText;