import React, {useEffect} from 'react'
import {LoginInitialStateType} from "../../../../bll/reducers/login-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppRootStateType} from "../../../../bll/store";
import {authTC} from "../../../../bll/reducers/profile-reducer";
import {LoadingSvg} from "../../../common/loading/LoadingSvg";
import {RequestStatusType} from "../../../../bll/reducers/app-reduser";
import {CardsPacksType} from "../../../../bll/reducers/cardsPacks-reducer";
import {getNewCardsTC} from '../../../../bll/reducers/cards-reducer';

export const CardsContainer = () => {

    const dispatch = useDispatch()
    const auth = useSelector<AppRootStateType, LoginInitialStateType>(state => state.login)
    const loading = useSelector<AppRootStateType, RequestStatusType>(state => state.app.requestStatus)
    const cardsPacks = useSelector<AppRootStateType, Array<CardsPacksType>>(state => state.packs.cardsPacks)
    const packs = useSelector<AppRootStateType, any>(state => state.cards.cards)
    const idPack = cardsPacks[0]?._id

    useEffect(() => {
        if (!auth.auth) {
            dispatch(authTC())
        }
    }, [])

    useEffect(() => {
        dispatch(getNewCardsTC(idPack))
    })

    if (!auth.auth) {
        return <Redirect to={'/login'}/>
    }

    console.log(idPack)
    console.log(packs)

    return (
        <div>
            {loading === "loading" ? <LoadingSvg/> : null}
            {packs}
            {/*<Cards/>*/}
        </div>
    )
}