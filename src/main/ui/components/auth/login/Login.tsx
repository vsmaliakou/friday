import React from 'react';
import {NavLink} from "react-router-dom";
import s from "./login.module.css";

export const Login = () => {
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
            <NavLink to={'/registration'} className={s.linkRegistration}>Sign Up</NavLink>
            {/*<div> {JSON.stringify(email)}</div>*/}
        </div>
    )
}
