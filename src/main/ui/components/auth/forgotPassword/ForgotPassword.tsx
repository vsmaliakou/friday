import React from 'react';
import s from './ForgotPassword.module.scss';
import logo from './../../../../../assets/img/logo.png';
import email from './../../../../../assets/img/ce.png';

export const ForgotPassword = () => {
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
                    Email  {/*компонента SuperInput*/}

                    <span className={s.text}>
                        Enter your email address and we will 
                        send you further instructions
                    </span>

                                        
                    <input className={s.forgotBtn}  type="submit" value="Send Instructions" />
                    

                    <span className={s.span}>Don’t have an account?</span>

                </form>

                <a href="#" className={s.logging}>Try logging in</a>

            </div>
        </div>
    )
}