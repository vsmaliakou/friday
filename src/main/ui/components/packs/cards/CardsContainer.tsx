import React, {ChangeEvent, useEffect, useState} from 'react'
import {LoginInitialStateType} from "../../../../bll/reducers/login-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useHistory, useParams} from "react-router-dom";
import {AppRootStateType} from "../../../../bll/store";
import {authTC} from "../../../../bll/reducers/profile-reducer";
import {RequestStatusType} from "../../../../bll/reducers/app-reduser";
import {createNewCardTC, deleteCardTC, getNewCardsTC} from '../../../../bll/reducers/cards-reducer';
import {Cards} from "./Cards";
import {CardType} from "../../../../dal/packs/cardsAPI";
import {NewCardType} from "./AddNewCard/AddNewCardContainer";

export const CardsContainer = () => {

    const dispatch = useDispatch()
    const auth = useSelector<AppRootStateType, LoginInitialStateType>(state => state.login)
    const loading = useSelector<AppRootStateType, RequestStatusType>(state => state.app.requestStatus)
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)

    const [newQuestion, setNewQuestion] = useState('')
    const [newAnswer, setNewAnswer] = useState('')
    const [grade, setGrade] = useState(0)

    const {_id} = useParams<{ _id: string }>()
    const history = useHistory()

    const card: NewCardType = {
        cardsPack_id: _id,
        question: newQuestion,
        answer: newAnswer,
        grade: grade,
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

    const addNewCard = () => {
        dispatch(createNewCardTC(card))
        // back()
    }
    const onChangeNewValueQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewQuestion(e.currentTarget.value)
    }
    const onChangeNewValueAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewAnswer(e.currentTarget.value)
    }

    const back = () => {
        history.push(`/packs/${_id}`);
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
               onChangeNewValueAnswerHandler={onChangeNewValueAnswerHandler}
               onChangeNewValueQuestionHandler={onChangeNewValueQuestionHandler}
               addNewCard={addNewCard}
        />
    )
}