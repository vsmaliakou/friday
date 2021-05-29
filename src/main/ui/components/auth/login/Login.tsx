import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import s from "./login.module.css";

// const instance = axios.create({
//     baseURL: 'http://localhost:7542/2.0/',
//     withCredentials: true,
//     headers: {}
// })


export const Login = () => {
    // const [state, setState] = useState<any>(null)
    // console.log(state)
    //
    // useEffect(() => {
    //     instance.post<any>('auth/login')
    //         .then((res) => {
    //             setState(res.data);
    //             debugger
    //         })
    // }, [])
    return (
        <div className={s.formLogin}>
            <h1>IT-Incubator</h1>
            <h2>Sign in</h2>
            <div className={s.inputArea}>
                Email: <input type="text"/>
                Password: <input type="password"/>
                <div className={s.rememberMeArea}>
                    <input type="checkbox"/>
                    Remember me
                </div>
            </div>
            <NavLink to={'/forgot'} className={s.linkForgot}>Forgot Password</NavLink>
            <button>Login</button>
            <p>Don't have an account?</p>
            {/*<div> {JSON.stringify(state)}</div>*/}
        </div>
    )
}
