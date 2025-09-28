import React from 'react';
import cl from './input.module.css'

const Input = ({label, value, onChange, ...props}) => {
    return (
        <div className={cl.inputBlock}>
            <span className={cl.label}>{label}</span>
            <input type='text' className={cl.input} value={value} onChange={onChange} {...props}/>
        </div>
    );
};

export default Input;