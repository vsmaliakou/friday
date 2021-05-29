import React, {useEffect, useState} from 'react';
import s from "./login.module.css";
import {useDispatch, useSelector} from "react-redux";
import {postUserDataTC} from '../../../../bll/reducers/login-reducer';
import {AppRootStateType} from "../../../../bll/store";
import {Login} from './Login';

export const LoginContainer = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(postUserDataTC('nya-admin@nya.nya', '1qazxcvBG', true))
    }, [])

    const addUserData = () => {

    }
    const dataUser = useSelector<AppRootStateType, {}>(state => state.login)
    console.log(dataUser)

    return (
        <div className={s.formLogin}>
            <Login/>
        </div>
    )
}
