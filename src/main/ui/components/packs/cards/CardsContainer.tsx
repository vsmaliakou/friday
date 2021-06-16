import React, {useEffect} from 'react'
import {LoginInitialStateType} from "../../../../bll/reducers/login-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useHistory, useParams} from "react-router-dom";
import {AppRootStateType} from "../../../../bll/store";
import {authTC} from "../../../../bll/reducers/profile-reducer";
import {RequestStatusType} from "../../../../bll/reducers/app-reduser";
import {deleteCardTC, getNewCardsTC} from '../../../../bll/reducers/cards-reducer';
import {Cards} from "./Cards";
import {CardType} from "../../../../dal/packs/cardsAPI";

export const CardsContainer = () => {

    const dispatch = useDispatch()
    const auth = useSelector<AppRootStateType, LoginInitialStateType>(state => state.login)
    const loading = useSelector<AppRootStateType, RequestStatusType>(state => state.app.requestStatus)
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
    // const idUser = useSelector<AppRootStateType, string | null>(state => state.login.dataUser._id)
    const idPack = useSelector<AppRootStateType, string | undefined>(state => state.cards.cards[0]?.user_id)

    const {_id} = useParams<{ _id: string }>()

    useEffect(() => {
        if (!auth.auth) {
            dispatch(authTC())
        } else {
            dispatch(getNewCardsTC(_id))
        }
    }, [])

    if (!auth.auth) {
        return <Redirect to={'/login'}/>
    }

    const deleteCard = (idCard: string) => {
        dispatch(deleteCardTC(idCard))
        // dispatch(getNewCardsTC(_id))
    }

    return (
        <Cards idUser={auth.dataUser?._id}
               idPack={idPack}
               loading={loading}
               cards={cards}
               deleteCard={deleteCard}
        />
    )
}