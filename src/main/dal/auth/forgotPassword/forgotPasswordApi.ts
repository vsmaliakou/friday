import axios from "axios";

const instance = axios.create({
     baseURL: 'http://localhost:7542/2.0/', // local
   // baseURL: 'https://neko-back.herokuapp.com/2.0', // heroku
    withCredentials: true,
    headers: {}
})

export type forgotPasswordType = {
    info: string
    error: string
}

export const forgotAPI = {
    postForgotPassword(email: string, from: string, message: string) {
        return instance.post<forgotPasswordType>(`auth/forgot`, {email, from, message})
    }
};