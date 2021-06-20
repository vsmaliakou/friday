import React from 'react';
import { Table } from '../../../common/Table/Table';
import s from './_myListCard.module.scss'







export const MyListCard = () => {
    return (
        <div className={s.main}>

            <div className={s.titleWrap}>
                <a className={s.close}></a>
                <h2 className={s.packListTitle}>Pack Name</h2>
            </div>

            <form className={s.inputWrap}>
                <input className={s.input} type="text" placeholder="Searh..."/>
            </form>

            <div className={s.wrap}>
                {/*<Table/>*/}
            </div>

        </div>

    )
}