import {createContext} from 'react'
import './App.css'
import AppRouter from "./components/AppRouter/AppRouter.jsx";
import CameraStore from "./store/CameraStore.js";
import UserStore from "./store/UserStore.js";
import CanvasStore from "./store/CanvasStore.js";
import MarkUpSettingsStore from "./store/MarkUpSettingsStore.js";
export const Context = createContext(null)
function App() {


    return (
        <Context.Provider value={
            {
                cameraStore: new CameraStore(),
                userStore: new UserStore(),
                canvasStore: new CanvasStore(),
                settingsStore: new MarkUpSettingsStore()
            }
        }>
            <AppRouter/>
        </Context.Provider>

    )
}

export default App
