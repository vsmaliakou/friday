import React, {ChangeEvent, useState} from 'react';
import s from './ForgotPassword.module.scss';
import logo from './../../../../../assets/img/logo.png';
import email from './../../../../../assets/img/ce.png';
import { Email } from '../authComponents/Email';
import { NavLink } from 'react-router-dom';
import SuperInputText from "../../../common/c1-SuperInputText/SuperInputText";
import {useDispatch, useSelector} from "react-redux";
import {forgotPasswordTC} from "../../../../bll/reducers/forgotPassword-reducer";
import {AppRootStateType} from "../../../../bll/store";

export const ForgotPasswordContainer = () => {
    const [email, setEmail] = useState<string>('')
    const from = 'vsmaliakou@yandex.by'
    const message = 'dsvdsvdvsd'
    const error = useSelector<AppRootStateType, string>(state=> state.forgotPassword.error)
    const dispatch = useDispatch()

    const addNewPassword =()=>{
        dispatch(forgotPasswordTC(email,from, message))
    }

    const onChangeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
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
                    Email:
                    <SuperInputText setError={x=>x}
                                    type={email}
                                    onChange={onChangeEmailHandler}
                    />
                    {error && <span>{error}</span>}
                    <span className={s.text}>
                        Enter your email address and we will 
                        send you further instructions
                    </span>

                                        
                    <input className={s.forgotBtn} onClick={addNewPassword}  type="submit" value="Send Instructions" />
                    

                    <span className={s.span}>Don’t have an account?</span>

                </form>

                <NavLink to={'/login'} className={s.logging}>Try logging in</NavLink>

            </div>
        </div>
    )
}