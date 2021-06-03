import React from 'react';
import s from './_packList.module.scss'
import logo from './../../../../assets/img/logo.png'
import card from './../../../../assets/img/packList.png'
import user from './../../../../assets/img/usre.png'
import {CardsPacksContainer} from "../packs/CardsPacksContainer";
import { LoadingSvg } from '../auth/loading/card/LoadingSvg';



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
                            
                            <input className={s.input1} type="radio" name="name" id="tab1"/>
                            <input className={s.input2} type="radio" name="name" id="tab2"/>

                            <label className={s.packList} htmlFor="tab1">
                               
                                <img className={s.packListImg} src={card}/>
                                <span className={s.packListSpan}>Pack List</span>
                            </label>

                            <label className={s.profile} htmlFor="tab2" >
                                <img className={s.profiltImg} src={user}/>
                                <span className={s.profileSpan}>Profile</span>
                            </label>

                        </div>

                    </div>

                </div>

            </div>
            <LoadingSvg/>

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

                    <CardsPacksContainer/>
                    
                </div>

            </div>

            

        </div>
    )
}