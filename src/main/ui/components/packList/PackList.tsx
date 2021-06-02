import React from 'react';
import s from './_packList.module.scss'
import logo from './../../../../assets/img/logo.png'
import card from './../../../../assets/img/packList.png'
import user from './../../../../assets/img/usre.png'
import { PackListCard } from './components/row/PackListCard';
import { Loading } from '../auth/loading/card/Loading';



export const PackList = () => {
    return (
        <div className={s.packListWrap}>
            
            <div className={s.header}>
                <div className={s.container}>

                    <div className={s.headerInner}>

                        <div className={s.logoWrap}>
                            <img className={s.logo} src={logo}/>
                        </div>

                        <div className={s.headreCards}>

                            <div className={s.packList}>
                                <img className={s.packListImg} src={card}/>
                                <span className={s.packListSpan}>Pack List</span>
                            </div>

                            <div className={s.profile}>
                                <img className={s.profiltImg} src={user}/>
                                <span className={s.profileSpan}>Profile</span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
            <Loading/>

            <div className={s.main}>
                <div className={s.filter}>
                    <h4 className={s.filterTitle}>Show packs cards</h4>
                    
                    <div className={s.filterWrap}>

                    </div>

                    <span className={s.filterSpan}>Number of cards</span>

                </div>

                <div className={s.content}>

                    <h2 className={s.packListTitle}>Packs list</h2>
                    <div className={s.iputWrap}>
                        <input type="text"/>
                      
                    </div>

                    <PackListCard/>
                    
                </div>

            </div>

        </div>
    )
}