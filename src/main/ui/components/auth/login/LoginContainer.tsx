import React, {ChangeEvent, useEffect, useState} from 'react';
import s from "./login.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../bll/store";
import {
    LoginInitialStateType,
    newUserDataTC,
    setErrorPageAC
} from '../../../../bll/reducers/login-reducer';
import {Redirect} from "react-router-dom";
import {Login} from "./Login";

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
            <Login
                title="Sign in"
                onChangeEmailHandler={onChangeEmailHandler}
                onChangePasswordHandler={onChangePasswordHandler}
                addUserData={addUserData}
                onChangeRememberMeHandler={onChangeRememberMeHandler}
                dataLogin={dataLogin}
            />
        </div>
    )
}
