import React, {useContext} from 'react';
import cl from './header.module.css'
import {NavLink, useNavigate} from "react-router-dom";
import {Context} from "../../../App.jsx";
const Header = () => {

    const {userStore, cameraStore} = useContext(Context)

    const navigate = useNavigate()

    const logOut = () => {
        localStorage.clear()
        userStore.setIsAuth(false)
        userStore.setUser({})
        cameraStore.setCameras([])
        navigate('/')
    }

    return (
        <header className={cl.header}>
            <NavLink to='/' className={cl.link}>
                <h1>Camera Service</h1>
            </NavLink>
            {userStore.isAuth &&
                <button onClick={logOut}>Выйти</button>
            }



        </header>
    );
};

export default Header;