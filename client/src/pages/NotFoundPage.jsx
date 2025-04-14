import React from 'react';
import {MAIN_ROUTE} from "../utils/consts.js";
import {NavLink} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div>
            <div className='title-wrapper'>
                <h1>Страница не найдена</h1>
                <NavLink to={MAIN_ROUTE}>На главную</NavLink>
            </div>
        </div>
    );
};

export default NotFoundPage;