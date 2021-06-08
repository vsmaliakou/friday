import React, {useEffect} from 'react'
import {LoginInitialStateType} from "../../../../bll/reducers/login-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppRootStateType} from "../../../../bll/store";
import {authTC} from "../../../../bll/reducers/profile-reducer";

export const CardsContainer = () => {

    const dispatch = useDispatch()

    const auth = useSelector<AppRootStateType, LoginInitialStateType>(state => state.login)
    const checkAuth = useSelector<AppRootStateType, null | string>(state => state.profile.errorMessage)
    const logOutSuccess = useSelector<AppRootStateType, null | string>(state => state.logOut.logOutInfo)


    useEffect(() => {
        if (auth.dataUser === null) {
            dispatch(authTC())
        }
    }, [])

    if (logOutSuccess || checkAuth) {
        return <Redirect to={'/login'}/>
    }

    // getNewCardsTC(id)

    return (
        <div>
            cards
            {/*<Cards/>*/}
        </div>
    )
}