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

    const {_id} = useParams<{ _id: string }>()
    const history = useHistory()

    const back = () => {
        history.push(`/packs/${_id}`);
    }

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
    }

    return (
        <Cards loading={loading}
               cards={cards}
               deleteCard={deleteCard}
               back={back}
               id={_id}
               idUser={auth.dataUser?._id}
        />
    )
}