import React from 'react';
import s from './Register.module.scss';
import logo from './../../../../../assets/img/logo.png';
import { Email } from '../authComponents/Email';
import { Password } from '../authComponents/Password';

export const Register = () => {
    return (
        <div className={s.reg}>
           <div className={s.card}>
                <img className={s.logo} src={logo} alt="logo"/>

                <h2 className={s.title}>Sign Up</h2>

                <form className={s.form}>

                    <Email/>

                    <Password/>
                    <Password/>

                    <div className={s.btnWrap}>

                        <button className={s.cancel}>Cancel</button>

                        <button className={s.regester}>Register</button>

                    </div>

                </form>



            </div>
        </div>
    )
}