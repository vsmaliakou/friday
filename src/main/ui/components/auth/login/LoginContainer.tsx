import React, {ChangeEvent, useEffect, useState} from 'react';
import s from "./login.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../bll/store";
import {postUserDataTC} from '../../../../bll/reducers/login-reducer';
import {NavLink} from "react-router-dom";

export const LoginContainer = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    const dispatch = useDispatch()

    dispatch(postUserDataTC(email, password, rememberMe))

    const addUserData = () => {
        dispatch(postUserDataTC(email, password, rememberMe))
    }

    // useEffect(() => {
    //     dispatch(postUserDataTC('nya-admin@nya.nya', '1qazxcvBG', true))
    // }, [])
    const addNewEmail = (newEmail: string) => {
        setEmail(newEmail)
    }
    const addNewPassword = (newPassword: string) => {
        setPassword(newPassword)
    }
    const changeRememberMe = (newValue: boolean) => {
        setRememberMe(newValue)
    }


    const onChangeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        addNewEmail(e.currentTarget.value)
    }
    const onChangePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        addNewPassword(e.currentTarget.value)
    }
    const onChangeRememberMeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeRememberMe(e.currentTarget.checked)
    }

    const dataUser = useSelector<AppRootStateType, {}>(state => state.login)
    console.log(`dataUser:${dataUser}`)
    console.log(`email:${email}`)
    console.log(`password:${password}`)
    console.log(`rememberMe:${rememberMe}`)

    return (
        <div className={s.formLogin}>
            <h1>IT-Incubator</h1>
            <h2>Sign in</h2>
            <div className={s.inputArea}>
                Email:
                <input type="text"
                       onChange={onChangeEmailHandler}
                />
                Password:
                <input type="password"
                       onChange={onChangePasswordHandler}
                />
                <div className={s.rememberMeArea}>
                    <input type="checkbox"
                           onChange={onChangeRememberMeHandler}
                    />
                    Remember me
                </div>
            </div>
            <NavLink to={'/forgot'} className={s.linkForgot}>Forgot Password</NavLink>
            <button onClick={addUserData}>
                Login
            </button>
            <p>Don't have an account?</p>
            {/*<Login/>*/}
        </div>
    )
}
