import React from 'react';
import s from './PacksList.module.scss'
import {Filter} from "../../packList/Filter";
import {CardsPacksContainer} from "../CardsPacksContainer";
import {PageNumber} from "../../packList/PageNumber";


export const PacksList = () => {
    return (
        <div className={s.main}>
            <Filter/>
            <div className={s.content}>
            
                <h2 className={s.packListTitle}>Packs list</h2>
                
                <form className={s.wrap}>
                    <input className={s.input} type="text" placeholder="Searh..."/>
                    <button className={s.btn}>Add new pack</button>
                                        
                </form>

                <CardsPacksContainer/>

                <PageNumber/>

            </div>

        </div>
        
        
    )
}