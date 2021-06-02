import React from 'react';
import s from './_packListCard.module.scss'



export const PackListCard = () => {
    return (

       <div className={s.card}>
            <div className={s.rowOne}>
                <span className={s.name}>Name</span>
                <span className={s.cards}>Cards</span>
                <span className={s.last}>Last</span>
                <span className={s.created}>Created</span>
                <span className={s.actions}>Actions</span>
            </div>
            <div className={s.rowTwo}>
                <span className={s.name}>Name</span>
                <span className={s.cards}>Cards</span>
                <span className={s.last}>Last</span>
                <span className={s.created}>Created</span>
                <span className={s.actions}>Actions</span>
            </div>
            <div className={s.rowOne}>
                <span className={s.name}>Name</span>
                <span className={s.cards}>Cards</span>
                <span className={s.last}>Last</span>
                <span className={s.created}>Created</span>
                <span className={s.actions}>Actions</span>
            </div>
       </div>
    )
}