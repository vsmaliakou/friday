import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../bll/store";
import {LoginInitialStateType, newUserDataTC, setErrorPageAC} from '../../../../bll/reducers/login-reducer';
import {Redirect} from "react-router-dom";
import {Login} from "./Login";
import {RequestStatusType} from "../../../../bll/reducers/app-reduser";

export const LoginContainer = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const dispatch = useDispatch()

    const dataLogin = useSelector<AppRootStateType, LoginInitialStateType>(state => state.login)
    const loading = useSelector<AppRootStateType, RequestStatusType>(state => state.app.requestStatus)

    if (dataLogin.auth) {
        return <Redirect to={'/profile'}/>
    }

    const addUserData = () => {
        dispatch(newUserDataTC(email, password, rememberMe))
        // dispatch(newUserDataTC('kwin649011@gmail.com', 'qwerasdf', rememberMe))
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
        dispatch(setErrorPageAC(''))
    }
    const onChangePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        addNewPassword(e.currentTarget.value)
        dispatch(setErrorPageAC(''))
    }
    const onChangeRememberMeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeRememberMe(e.currentTarget.checked)
    }

    return (
        <Login
            title="Sign in"
            onChangeEmailHandler={onChangeEmailHandler}
            onChangePasswordHandler={onChangePasswordHandler}
            addUserData={addUserData}
            onChangeRememberMeHandler={onChangeRememberMeHandler}
            dataLogin={dataLogin}
            preloader={loading}
        />
    )
}