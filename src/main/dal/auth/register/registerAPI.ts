import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
    headers: {}
})

export type PayloadType = {
    email: string
    password: string
}

export const registerAPI = {
    setRegisterData(payload: PayloadType){
        return instance.post('auth/register', payload)
    }
}