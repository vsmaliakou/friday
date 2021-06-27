import React, {useEffect, useState} from 'react';
import s from './ContainerPage.module.scss'
import logo from '../../../../assets/img/logo.png'
import {authTC} from "../../../bll/reducers/profile-reducer";
import {Redirect, Route, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";
import {LoginInitialStateType} from "../../../bll/reducers/login-reducer";
import {PacksPage} from "./packsPage/PacksPage";
import {CardsPage} from "./cardsPage/CardsPage";
import {ProfilePage} from "./profilePage/ProfilePage";
import {LearnPage} from "./learnPage/LearnPage";
import {RequestStatusType} from "../../../bll/reducers/app-reduser";
import {LoadingSvg} from "../../common/Loading/LoadingSvg";

export const ContainerPage = () => {

    const auth = useSelector<AppRootStateType, LoginInitialStateType>(state => state.login)
    const requestStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.requestStatus)
    const [activePacksBtn, setActivePacksBtn] = useState(false)
    const [activeProfileBtn, setActiveProfileBtn] = useState(true)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (!auth.auth) {
            dispatch(authTC())
        }
    }, [])

    if (!auth.auth) {
        return <Redirect to={'/login'}/>
    }

    const redirectToPacks = () => {
        setActivePacksBtn(true)
        setActiveProfileBtn(false)
        history.push('/packs')
    }
    const redirectToProfile = () => {
        setActiveProfileBtn(true)
        setActivePacksBtn(false)
        history.push('/profile')
    }

    return (
        <div className={s.packListWrap}>
            {requestStatus === "loading" && <LoadingSvg/>}
            <div className={s.header}>
                <div className={s.headerInner}>
                    <div className={s.logoWrap}>
                        <img className={s.logo} src={logo} alt="logo"/>
                    </div>
                    <div className={s.btnWrap}>
                        <button className={activePacksBtn ? `${s.btnPackList} ${s.activeBtn}` : s.btnPackList} onClick={redirectToPacks}>PackList</button>
                        <button className={activeProfileBtn ? `${s.btnProfile} ${s.activeBtn}` : s.btnProfile} onClick={redirectToProfile}>Profile</button>
                    </div>
                </div>
            </div>
            <div className={s.content}>
                <Route path='/profile/:user_id?' render={() => <ProfilePage auth={auth}/>}/>
                <Route exact path='/packs' render={() => <PacksPage auth={auth}/>}/>
                <Route exact path={'/packs/:_id'} render={() => (<CardsPage auth={auth}/>)}/>
                <Route exact path={'/learn/:_id'} render={() => (<LearnPage/>)}/>
            </div>
        </div>
    )
}