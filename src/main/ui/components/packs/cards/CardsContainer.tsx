import React, {useEffect} from 'react'
import {LoginInitialStateType} from "../../../../bll/reducers/login-reducer";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, Redirect, useParams} from "react-router-dom";
import {AppRootStateType} from "../../../../bll/store";
import {authTC} from "../../../../bll/reducers/profile-reducer";
import {LoadingSvg} from "../../../common/loading/LoadingSvg";
import {RequestStatusType} from "../../../../bll/reducers/app-reduser";
import {CardsPacksType} from "../../../../bll/reducers/cardsPacks-reducer";
import {getNewCardsTC} from '../../../../bll/reducers/cards-reducer';
import {CardsType} from "../../../../dal/packs/cardsAPI";

export const CardsContainer = () => {

    const dispatch = useDispatch()
    const auth = useSelector<AppRootStateType, LoginInitialStateType>(state => state.login)
    const loading = useSelector<AppRootStateType, RequestStatusType>(state => state.app.requestStatus)
    const cardsPacks = useSelector<AppRootStateType, Array<CardsPacksType>>(state => state.packs.cardsPacks)
    const cards = useSelector<AppRootStateType, Array<CardsType> | null>(state => state.cards.cards)

    const {_id} = useParams<{ _id: string }>()

    useEffect(() => {
        if (!auth.auth) {
            dispatch(authTC())
        }
    }, [])

    useEffect(() => {
        dispatch(getNewCardsTC(_id))
    }, [])

    if (!auth.auth) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div>

            {loading === "loading" ? <LoadingSvg/> : null}

            <div>
                <NavLink to={'/packs'}>
                    <img src="arrow" alt=""/>
                    Pack Name
                </NavLink>

                {
                    cards?.map(cards => {
                        return (
                            <div key={cards._id}>
                                <div>{cards.question}</div>
                                <div>{cards.answer}</div>
                                <div>{cards.updated}</div>
                                <div>{cards.grade}</div>
                                <div> Actions:
                                    <button onClick={() => {
                                    }}>Delete
                                    </button>
                                    <NavLink to={'/#'}>
                                        <button>Edit
                                        </button>
                                    </NavLink>
                                </div>
                            </div>
                        )
                    })

                }
            </div>
        </div>
    )
}