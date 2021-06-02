import React from 'react';
import { PackListCell } from '../cell/PackListCell';
import s from './_packListCard.module.scss'



export const PackListCard = () => {
    return (

       <div className={s.card}>

            <div className={s.rowColor}>

                <div className={s.item}>
                    <PackListCell/>
                </div>

                <div className={s.item}>
                    <PackListCell/>
                </div>

                <div className={s.item}>
                    <PackListCell/>
                </div>

                <div className={s.item}>
                    <select className={s.select}>
                        <option>Last Updated</option>
                        <option>One Updated</option>
                    </select>
                </div>

                <div className={s.item}>
                    <PackListCell/>
                </div>      
                
            </div>

            <div className={s.rowWhite}>

                <div className={s.item}>
                    <PackListCell/>
                </div>

                <div className={s.item}>
                    <PackListCell/>
                </div>

                <div className={s.item}>
                    <PackListCell/>
                </div>

                <div className={s.item}>
                    <PackListCell/>
                </div>

                <div className={s.item}>
                    <button>Delete</button>
                    <button>Delete</button>
                </div>      

            </div>


           
            
        </div>
    )
}