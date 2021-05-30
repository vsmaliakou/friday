import React from 'react';
import s from './SetPassword.module.scss';
import logo from './../../../../../assets/img/logo.png';
import { Password } from '../authComponents/Password';

export const SetPassword = () => {
    return (
        <div className={s.set}>
            <div className={s.card}>
                <img className={s.logo} src={logo} alt="logo"/>

                <h2 className={s.title}>Create new password</h2>
                
                <form className={s.form}>
                    <Password/>

                    <span className={s.text}>
                        Create new password and we will send you further instructions to email
                    </span>

                    <input className={s.Btn}  type="submit" value="Create new password" />
                </form>
            </div>    
        </div>
    )
}