import React from 'react';
import { CardsPacksContainer } from '../../packs/PacksList/CardsPacksContainer';
import { Filter } from '../Filter';
import { FilterProfile } from '../FilterProfile';

import s from './_firstPage.module.scss'







export const FirstPage = () => {
    return (
        <div className={s.main}>
            <Filter/>
            {/* <FilterProfile/> */}
            <div className={s.content}>
            
                <h2 className={s.packListTitle}>Packs list</h2>
                
                <form className={s.wrap}>
                    <input className={s.input} type="text" placeholder="Searh..."/>
                    <button className={s.btn}>Add new pack</button>
                                        
                </form>

                <CardsPacksContainer/>

                

            </div>

        </div>
        
        
    )
}