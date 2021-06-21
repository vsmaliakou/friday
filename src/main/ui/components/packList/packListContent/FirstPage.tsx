import React from 'react';
import { Table } from '../../../common/Table/Table';
import { Filter } from '../../packs/packListPage/packList/filter/Filter';
import { ProfileInfo } from '../../profile/ProfileInfo';

import s from './_firstPage.module.scss'







export const FirstPage = () => {
    return (
        <div className={s.main}>
            {/*<Filter/>*/}
            {/* <ProfileInfo/> */}
            <div className={s.content}>
            
                <h2 className={s.packListTitle}>Packs list</h2>
                
                <form className={s.wrap}>
                    <input className={s.input} type="text" placeholder="Searh..."/>
                    <button className={s.btn}>Add new pack</button>
                                        
                </form>

                {/*<Table/>*/}



            </div>

        </div>
        
        
    )
}