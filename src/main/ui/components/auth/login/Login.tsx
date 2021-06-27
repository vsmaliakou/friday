import React, {ChangeEvent} from 'react';
import s from './Login.module.scss';
import logo from './../../../../../assets/img/logo.png';
import InputText from "../../../common/InputText/InputText";
import {NavLink} from "react-router-dom";
import Checkbox from "../../../common/Checkbox/Checkbox";
import {LoginInitialStateType} from "../../../../bll/reducers/login-reducer";
import {RequestStatusType} from "../../../../bll/reducers/app-reduser";
import Button from "../../../common/Button/Button";
import {LoadingSvg} from '../../../common/Loading/LoadingSvg';

type PropsType = {
    title: string
    onChangeEmailHandler: (e: ChangeEvent<HTMLInputElement>) => void
    onChangePasswordHandler: (e: ChangeEvent<HTMLInputElement>) => void
    addUserData: () => void
    onChangeRememberMeHandler: (e: ChangeEvent<HTMLInputElement>) => void
    dataLogin: LoginInitialStateType
    preloader: RequestStatusType
}

export const Login: React.FC<PropsType> = (props) => {
    return (
        <div className={s.login}>
            <div className={s.card}>
                {props.preloader === "loading" ? <LoadingSvg/> : null}
                <img className={s.logo} src={logo} alt="logo"/>
                <h2 className={s.title}>Sign In</h2>
                <span className={s.error}>{props.dataLogin.errorMessage}</span>
                <form className={s.form}>
                    <InputText type={'email'}
                               onChange={props.onChangeEmailHandler}
                               label={'Email'}
                    />
                    <InputText type={'password'}
                               onChange={props.onChangePasswordHandler}
                               label={'Password'}
                    />
                    <Checkbox type={'checkbox'}
                              onChange={props.onChangeRememberMeHandler}
                    />
                    <NavLink to={'/forgot'} className={s.forgot}>Forgot Password</NavLink>
                    <Button
                        className={s.loginBtn}
                        onClick={props.addUserData}>Login
                    </Button>
                    <span className={s.account}>Don't have an account?</span>
                </form>
                <NavLink className={s.reg} to={'/registration'}>Sign up</NavLink>
            </div>
        </div>
    )
}