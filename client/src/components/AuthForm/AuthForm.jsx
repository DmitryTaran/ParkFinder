import React, {useContext, useState} from 'react';
import Input from "../UI/Input/Input.jsx";
import Form from "../UI/Form/Form.jsx";
import cl from './authForm.module.css'
import {useFetching} from "../../hooks/useFetching.js";
import {login, registration} from "../../http/userAPI.js";
import {Context} from "../../App.jsx";
import Loading from "../UI/Loading/Loading.jsx";

const AuthForm = () => {

    const {userStore} = useContext(Context)

    const [isLogin, setIsLogin] = useState(true)

    const [logIn, setLogIn] = useState('')

    const [password, setPassword] = useState('')

    const [signIn, isSignInLoading] = useFetching(async () => {
        await login(logIn, password).then(data => {
            userStore.setUser(data)
            userStore.setIsAuth(true)
        })
    })

    const [signUp, signUpLoading] = useFetching(async () => {
        await registration(logIn, password).then(data => {
            userStore.setUser(data)
            userStore.setIsAuth(true)
        })
    })

    return (
        <div className={cl.authForm}>
            <Loading isLoading={isSignInLoading || signUpLoading}/>
            <Form>
                <h2>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>

                <div className={cl.formInputs}>
                    <Input
                        type="text"
                        placeholder="Введите логин"
                        title={'E-mail'}
                        value={logIn}
                        onChange={(e) => setLogIn(e.target.value)}

                    />
                    <Input
                        type="password"
                        placeholder="Введите пароль"
                        title={'Пароль'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {isLogin
                    ? <div className={cl.entering}>
                        {/*<div className={cl.haveAccount}>*/}
                        {/*    Нет аккаунта? <span onClick={() => setIsLogin(false)}>Зарегистрируйтесь</span>*/}
                        {/*</div>*/}
                        <button onClick={signIn}>Войти</button>
                    </div>

                    : <div className={cl.entering}>
                        <div className={cl.haveAccount}>
                            Есть аккаунт? <span onClick={() => setIsLogin(true)}>Войдите</span>
                        </div>
                        <button onClick={signUp}>Зарегистрироваться</button>
                    </div>
                }

            </Form>
        </div>

    );
};

export default AuthForm;