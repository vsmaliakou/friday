import React, {ChangeEvent, useEffect, useState} from 'react';
import s from "./login.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../bll/store";
import {
    LoginInitialStateType,
    newUserDataTC,
    setErrorPageAC
} from '../../../../bll/reducers/login-reducer';
import {NavLink, Redirect} from "react-router-dom";
import SuperInputText from "../../../common/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../../../common/c3-SuperCheckbox/SuperCheckbox";

export const LoginContainer = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const dispatch = useDispatch()

    const dataLogin = useSelector<AppRootStateType, LoginInitialStateType>(state => state.login)

    useEffect(() => {
        dispatch(setErrorPageAC(''))
    }, [email, password])


    if (dataLogin.dataUser !== null) {
        return <Redirect to={'/profile'}/>
    }

    const addUserData = () => {
        dispatch(newUserDataTC(email, password, rememberMe))
    }
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

    return (
        <div className={s.formLogin}>
            <h1>IT-Incubator</h1>
            <h2>Sign in</h2>
            <div className={s.inputArea}>
                Email:
                <SuperInputText type={'email'}
                                setError={x => x}
                                onChange={onChangeEmailHandler}
                />
                Password:
                <SuperInputText type={'password'}
                                setError={x => x}
                                onChange={onChangePasswordHandler}
                />
                <div className={s.rememberMeArea}>
                    <SuperCheckbox type={'checkbox'}
                                   onChange={onChangeRememberMeHandler}
                    />
                    Remember me
                </div>
                <span>{dataLogin.errorMessage}</span>
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
