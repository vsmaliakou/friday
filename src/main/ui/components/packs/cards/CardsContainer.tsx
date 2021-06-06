import React, {useEffect} from 'react'
import {LoginInitialStateType} from "../../../../bll/reducers/login-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppRootStateType} from "../../../../bll/store";
import {checkDataUserTC} from "../../../../bll/reducers/profile-reducer";

export const CardsContainer = () => {

    const auth = useSelector<AppRootStateType, LoginInitialStateType>(state => state.login)
    const cards = useSelector<AppRootStateType, any>(state => state.cards.cards)
    const checkAuth = useSelector<AppRootStateType, null | string>(state => state.cards.errorMessage)
    const dispatch = useDispatch()

    useEffect(() => {
        if (auth.dataUser === null) {
            // dispatch(getNewCardsTC(id)) // id пака
            dispatch(checkDataUserTC())
        }
    }, [])

    if (checkAuth) {
        return <Redirect to={'/login'}/>
    }
        //????
    return (
        <div>
            cards
            {/*<Cards/>*/}
        </div>
    )
}