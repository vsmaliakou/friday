import React from 'react';
import s from './Email.module.scss'


export const Email = () => {
    return (
        
        <div className={s.wrap}>
             <input type="email" />
             <label>Email</label>
        </div>
    )
}