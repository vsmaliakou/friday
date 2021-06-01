import React, {ChangeEvent} from 'react';
import s from './ForgotPassword.module.scss';
import logo from './../../../../../assets/img/logo.png';
import email from './../../../../../assets/img/ce.png';
import SuperInputText from "../../../common/c1-SuperInputText/SuperInputText";
import {NavLink} from "react-router-dom";
import SuperButton from "../../../common/c2-SuperButton/SuperButton";



type ForgotPasswordType = {
    addNewPassword: ()=>void
    onChangeEmailHandler: (e: ChangeEvent<HTMLInputElement>) => void
    error: string
    requestStatus: string
}

export const ForgotPassword: React.FC<ForgotPasswordType> = ({requestStatus,addNewPassword, onChangeEmailHandler, error}) => {
    return (
        <div className={s.forgot}>
            <div className={s.card}>

                <img className={s.logo} src={logo} alt="logo"/>

                {/* <img className={s.logo} src={email} alt="logo"/>
                                                                                ( карточка с информацией о отправленном письме на мыло)
                <span className={s.check}>Check Email</span>

                <span className={s.checkText}>
                    We’ve sent an Email with instructions to example@mail.com
                </span> */}

                <h2 className={s.title}>Forgot your password?</h2>

                <form className={s.form}>
                    {error && <span>{error}</span>}
                    {requestStatus === "loading" && <span>loading...</span>}
                    <SuperInputText setError={x=>x}
                                    type={email}
                                    onChange={onChangeEmailHandler}
                                    label={"Email"}
                    />
                    <span className={s.text}>
                        Enter your email address and we will 
                        send you further instructions
                    </span>

                                        
                    <SuperButton className={s.forgotBtn}
                                 onClick={addNewPassword}
                                 disabled={requestStatus === "loading" ? true : false}
                    >Send instruction</SuperButton>
                    

                    <span className={s.span}>Don’t have an account?</span>

                </form>

                <NavLink to={'/login'} className={s.logging}>Try logging in</NavLink>

            </div>
        </div>
    )
}