import {$authHost, $host} from "./index.js";
import jwtDecode from 'jwt-decode'

export const registration = async (login, password) => {
    const {data} = await $host.post('api/user/registration', {login, password})

    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (login, password) => {
    const {data} = await $host.post('api/user/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    if (localStorage.getItem('token')) {
        const {data} = await $authHost.get('api/user/auth')
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    }
}