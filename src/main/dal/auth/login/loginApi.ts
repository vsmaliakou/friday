import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
    headers: {}
})

export type LoginType = {
    avatar?: string
    created: Date
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: Date
    verified: boolean
    __v: number
    _id: string
}

export const loginAPI = {
    postLogin(email: string, password: string, rememberMe: boolean) {
        return instance.post<LoginType>(`auth/login`, {email, password, rememberMe})
    }
};