import React from 'react';
import Header from "../UI/Header/Header.jsx";
import cl from './layout.module.css'
import {Outlet} from "react-router-dom";
const Layout = () => {



    return (
        <div className={cl.flexWrapper}>
            <Header/>
            <div className={cl.pageWrapper}>
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;