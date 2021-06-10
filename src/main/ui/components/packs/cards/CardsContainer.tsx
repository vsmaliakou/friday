import React, {useEffect} from 'react'
import {LoginInitialStateType} from "../../../../bll/reducers/login-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppRootStateType} from "../../../../bll/store";
import {authTC} from "../../../../bll/reducers/profile-reducer";
import {LoadingSvg} from "../../../common/loading/LoadingSvg";
import {RequestStatusType} from "../../../../bll/reducers/app-reduser";

export const CardsContainer = () => {

    const dispatch = useDispatch()
    const auth = useSelector<AppRootStateType, LoginInitialStateType>(state => state.login)
    const loading = useSelector<AppRootStateType, RequestStatusType>(state => state.app.requestStatus)

    useEffect(() => {
        if (!auth.auth) {
            dispatch(authTC())
        }
    }, [])

    if (!auth.auth) {
        return <Redirect to={'/login'}/>
    }

    // getNewCardsTC(id)

    return (
        <div>

            {loading === "loading" ? <LoadingSvg/> : null}

            cards
            {/*<Cards/>*/}
        </div>
    )
}