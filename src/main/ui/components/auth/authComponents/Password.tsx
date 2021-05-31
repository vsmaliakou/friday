import React from 'react';
import s from './Password.module.scss'


export const Password = () => {
    return (
        
        <div className={s.password}>
            <input type="password"/>
            <label>Password</label>
            <a className={s.passwordControl} href="#" ></a>
        </div>
    )
}