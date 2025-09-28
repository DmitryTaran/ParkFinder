import React, {useState} from 'react';
import cl from './titleChanger.module.css'
import {AiOutlineCheck, RxCross2} from "react-icons/all.js";
import Input from "../UI/Input/Input.jsx";

const TitleChanger = ({initialValue, setInitialValue, setShow, changeFunction}) => {

    return (
        <div className={cl.titleChanger}>
            <div className={cl.inputWrapper}>
                <Input
                    placeholder='Введите заголовок'
                    type="text"
                    value={initialValue}
                    onChange={(e) => setInitialValue(e.target.value)}
                />
            </div>
            <button className={cl.button} onClick={(e) => {
                e.stopPropagation()

                setShow(false)
            }}>
                <RxCross2 color={"#6b6b6b"}/>
            </button>
            <button className={cl.button} onClick={(e) => {
                e.stopPropagation()
                changeFunction()
                setShow(false)
            }}>
                <AiOutlineCheck color={"#6b6b6b"}/>
            </button>

        </div>
    );
};

export default TitleChanger;