import React from 'react';
import s from './Login.module.scss';
import logo from './../../../../../assets/img/logo.png';
import { Email } from '../authComponents/Email';
import { Password } from '../authComponents/Password';

// type PropsType = {
//     title: string
// }

// export const Login: React.FC< PropsType> = (props) => {
export const Login = () => {
    return (
        <div className={s.login}>

           <div className={s.card}>

               <img className={s.logo} src={logo} alt="logo"/>

               <h2 className={s.title}>Sign In</h2>

                <form className={s.form}>

                    <Email/>

                    <Password/>

                    <button className={s.forgot}>Forgot Password</button>
                    
                    <input className={s.loginBtn}  type="submit" value="Login" />
                    

                    <button className={s.account}>Don’t have an account?</button>

                </form>


                <a className={s.reg}>Sign UP</a>
               

           </div>

        </div>
    )
}