import React, {ChangeEvent, useEffect, useState} from 'react'
import s from "../../../common/Table/Table.module.scss";
import {LoginInitialStateType} from "../../../../bll/reducers/login-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useParams} from "react-router-dom";
import {AppRootStateType} from "../../../../bll/store";
import {authTC} from "../../../../bll/reducers/profile-reducer";
import {createNewCardTC, getNewCardsTC} from '../../../../bll/reducers/cards-reducer';
import {Cards} from "./Cards";
import {CardType} from "../../../../dal/packs/cardsAPI";
import {NewCardType} from "./AddNewCard/AddNewCardContainer";
import {AddWindow} from "../../../common/AddWindow/AddWindow";

export const CardsContainer = () => {

    const auth = useSelector<AppRootStateType, LoginInitialStateType>(state => state.login)
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
    const idUserPack = useSelector<AppRootStateType, string>(state => state.cards.idUserCards)
    const disableButton = useSelector<AppRootStateType, boolean>(state => state.cards.buttonDisable)

    const dispatch = useDispatch()

    //createNewCard
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [addWinOpened, setAddWinOpened] = useState(false)

    const {_id} = useParams<{ _id: string }>()

    //createNewCard
    const card: NewCardType = {
        cardsPack_id: _id,
        question: question,
        answer: answer,
        shots: 0,
        rating: 0,
        answerImg: '',
        questionImg: '',
        questionVideo: '',
        answerVideo: '',
        type: '',
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

    const openWindowAddCard = () => {
        setAddWinOpened(true)
    }
    const addCardCallback = () => {
        dispatch(createNewCardTC(card))
        setAddWinOpened(false)
    }
    const closeWindowCallback = () => {
        setAddWinOpened(false)
    }
    const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    return (
        <table className={s.table}>
            <tr className={s.title}>
                <th className={s.col}>Question</th>
                <th className={s.col}>Answer</th>
                <th className={s.col}>
                    <select className={s.select}>
                        <option>Last Updated</option>
                        <option>One Updated</option>
                    </select>
                </th>
                <th className={s.col}>Grade</th>
                {idUserPack === auth.dataUser?._id
                    ? <th className={s.col}>
                        <button className={s.btnAdd} onClick={openWindowAddCard}>Add card</button>
                    </th>
                    : null
                }
            </tr>

            <Cards
                cards={cards}
                idUser={auth.dataUser?._id}
                idUserPack={idUserPack}
                disableButton={disableButton}
            />
            {addWinOpened &&
            <AddWindow
                title={'Add new card'}
                placeholder={'Name'}
                newTitleCallback={onChangeQuestion}
                answerCallback={onChangeAnswer}
                addCallback={addCardCallback}
                closeCallback={closeWindowCallback}
            />}
            {cards?.length <= 0 && <p>This pack is empty.</p>}

        </table>
    )
}