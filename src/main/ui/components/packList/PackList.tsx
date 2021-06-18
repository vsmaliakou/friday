import React from 'react';
import s from './_packList.module.scss'
import logo from './../../../../assets/img/logo.png'
import { LoadingSvg } from '../../common/loading/LoadingSvg';
import { FirstPage } from './packListContent/FirstPage';
import { SecondPage } from './packListContent/SecondPage';
import { MyListCard } from './packListContent/MyListCard';
import { AddWindow } from '../../common/AddWindow/AddWindow';
import { DeleteWindow } from '../../common/DeleteWindow/DeleteWindow';
import { AddNewCard } from './AddNewCard';
import { PackName } from './packListContent/PackName';
import { LearnQuestion } from './LearnQuestion';
import { LearnAnswer } from './LearnAnswer';
import { EditProfile } from './EditProfile';





export const PackList = () => {
    return (
        <div className={s.packListWrap}>
           {/* <DeleteWindow/> */}
           {/* <AddWindow/> */}
           

            <div className={s.header}>

                <div className={s.headerInner}>

                    <div className={s.logoWrap}>
                        <img className={s.logo} src={logo}/>
                    </div>

                    <div className={s.btnWrap}>
                        <button className={s.btnPackList}>PackList</button>
                        <button className={s.btnProfile}>Profile</button>
                    </div>

                </div>

            </div>

            <div className={s.content}>

                {/* <FirstPage/> */}

                {/* <SecondPage/> */}

                {/* <AddNewCard/> */}

                {/* <MyListCard/> */}

                {/* <PackName/> */}

                {/* <LearnQuestion/> */}

                {/* <LearnAnswer/> */}
                
                {/* <EditProfile/> */}

                

            </div>
       

           

            

        </div>
    )
}