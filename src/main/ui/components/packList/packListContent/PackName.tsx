import React from 'react';
import { CardsPacksContainer } from '../../packs/CardsPacksContainer';
import { PageNumber } from '../PageNumber';
import s from './_packName.module.scss'







export const PackName = () => {
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
                <table className={s.table}>

                    <tr className={s.title}>
                        <th className={s.col}>
                            <span className={s.colSpan}>Question</span>
                        </th>
                        <th className={s.col}>
                            <span className={s.colSpan}>Answer</span>
                        </th>
                        <th className={s.col}>
                            <select className={s.select}>
                                <option>Last Updated</option>
                                <option>First Updated</option>
                            </select>
                        </th>
                        <th className={s.col}>
                            <span className={s.colSpan}>Grade</span>
                        </th>
                        
                    </tr>
                    <tr className={s.row}>
                        <th>asdsad</th>
                        <th className={s.col}>asdsasdasdasdsdsadasdasdaad</th>
                        <th>asdsad</th>
                        <th>asdsad</th>
                       
                    </tr>
                    <tr className={s.row}>
                        <th>asdsad</th>
                        <th>asdsad</th>
                        <th>asdsad</th>
                        <th>asdsad</th>
                       
                    </tr>
                    <tr className={s.row}>
                        <th>asdsad</th>
                        <th>asdsad</th>
                        <th>asdsad</th>
                        <th>asdsad</th>
                       
                    </tr>
                    <tr className={s.row}>
                        <th>asdsad</th>
                        <th>asdsad</th>
                        <th>asdsad</th>
                        <th>asdsad</th>
                       
                    </tr>
                    <tr className={s.row}>
                        <th>asdsad</th>
                        <th>asdsad</th>
                        <th>asdsad</th>
                        <th>asdsad</th>
                       
                    </tr>
                    <tr className={s.row}>
                        <th>asdsad</th>
                        <th>asdsad</th>
                        <th>asdsad</th>
                        <th>asdsad</th>
                       
                    </tr>
                    <tr className={s.row}>
                        <th>asdsad</th>
                        <th>asdsad</th>
                        <th>asdsad</th>
                        <th>asdsad</th>
                       
                    </tr>
                    <tr className={s.row}>
                        <th>asdsad</th>
                        <th>asdsad</th>
                        <th>asdsad</th>
                        <th>asdsad</th>
                       
                    </tr>
                    <tr className={s.row}>
                        <th>asdsad</th>
                        <th>asdsad</th>
                        <th>asdsad</th>
                        <th>asdsad</th>
                       
                    </tr>
                    
                </table>

                <PageNumber/>
            </div>

            

        </div>
        
        
    )
}