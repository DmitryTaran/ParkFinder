import React from 'react';
import cl from './checkBox.module.css'
import {BsCheckLg} from "react-icons/all.js";

const CheckBox = ({isCompleted, setIsCompleted, update}) => {
    return (
        <div className={cl.checkbox} onClick={(e) => {
            e.stopPropagation()
            update()
            setIsCompleted(!isCompleted)
        }}>
            {isCompleted &&
                <BsCheckLg size={35} color={'green'}/>
            }
        </div>
    );
};

export default CheckBox;