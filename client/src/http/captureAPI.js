import {$captureHost} from "./index.js";


export const activateCapture = async () => {
    const {data} = await $captureHost.post('/start_capture')
    return data
}

export const checkVideoCapture = async () => {
    const {data} = await $captureHost.get('/')
    return data
}

export const deactivateCapture = async () => {
    const {data} = await $captureHost.post('/stop_capture')
    return data
}

export const notifyCapture = async () => {
    const {data} = await $captureHost.post('/hook')
    return data
}