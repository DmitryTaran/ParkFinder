import React, {useContext, useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom'
import CameraPage from "../../pages/CameraPage.jsx";
import CameraInfoPage from "../../pages/CameraInfoPage.jsx";
import Layout from "../Layout/Layout.jsx";
import {MAIN_ROUTE, CAMERA_ROUTE, MARKUP_ROUTE} from "../../utils/consts.js";
import AuthPage from "../../pages/AuthPage.jsx";
import {Context} from "../../App.jsx";
import {useFetching} from "../../hooks/useFetching.js";
import {check} from "../../http/userAPI.js";
import Loading from "../UI/Loading/Loading.jsx";
import {observer} from "mobx-react-lite";
import {getCameras} from "../../http/cameraAPI.js";
import MarkUpPage from "../../pages/MarkUpPage.jsx";
import NotFoundPage from "../../pages/NotFoundPage.jsx";

const AppRouter = observer(() => {

    const {userStore, cameraStore} = useContext(Context)
    const [authCheck, isAuthCheckLoading] = useFetching(async () => {
        await check().then(data => {
            if (data) {
                userStore.setUser(data)
                userStore.setIsAuth(true)
            }
        })
        if (userStore.isAuth)
            await getCameras().then(data => {
                cameraStore.setCameras(data)
            })
    })

    useEffect(() => {
        authCheck()
    }, [])
    return (
        <>
            {isAuthCheckLoading ? <Loading isLoading={isAuthCheckLoading}/>
                : userStore.isAuth ?
                    <Routes>
                        <Route path={MAIN_ROUTE} element={<Layout/>}>
                            <Route index element={<CameraPage/>}/>
                            <Route path={CAMERA_ROUTE + ":id"} element={<CameraInfoPage/>}/>
                            <Route path={MARKUP_ROUTE + ":id"} element={<MarkUpPage/>}/>
                            <Route path='*' element={<NotFoundPage/>}/>
                        </Route>
                    </Routes> :
                    <Routes>
                        <Route path={MAIN_ROUTE} element={<Layout/>}>
                            <Route index element={<AuthPage/>}/>
                            <Route path='*' element={<NotFoundPage/>}/>
                        </Route>
                    </Routes>
            }


        </>

    );
});

export default AppRouter;