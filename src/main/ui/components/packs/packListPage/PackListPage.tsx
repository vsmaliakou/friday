import React, {useEffect} from 'react';
import s from './PackList.module.scss'
import logo from '../../../../../assets/img/logo.png'
import {authTC} from "../../../../bll/reducers/profile-reducer";
import {Redirect, Route, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../bll/store";
import {LoginInitialStateType} from "../../../../bll/reducers/login-reducer";
import {PacksList} from "./packList/PacksList";
import {CardsPage} from "../cards/CardsPage";
import {ProfileContainer} from "../../profile/ProfileContainer";
import {LearnPage} from "../learnPage/LearnPage";

export const PackListPage = () => {

    const auth = useSelector<AppRootStateType, LoginInitialStateType>(state => state.login)

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
        history.push('/packs')
    }
    const redirectToProfile = () => {
        history.push('/profile')
    }

    return (
        <div className={s.packListWrap}>
            <div className={s.header}>
                <div className={s.headerInner}>
                    <div className={s.logoWrap}>
                        <img className={s.logo} src={logo}/>
                    </div>
                    <div className={s.btnWrap}>
                        <button className={s.btnPackList} onClick={redirectToPacks}>PackList</button>
                        <button className={s.btnProfile} onClick={redirectToProfile}>Profile</button>
                    </div>
                </div>
            </div>
            <div className={s.content}>
                <Route path='/profile/:user_id?' render={() => <ProfileContainer/>}/>
                <Route exact path='/packs' render={() => <PacksList/>}/>
                <Route exact path={'/packs/:_id'} render={() => (<CardsPage/>)}/>
                <Route exact path={'/learn/:_id'} render={() => (<LearnPage/>)}/>
            </div>
        </div>
    )
}