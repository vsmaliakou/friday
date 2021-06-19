import React, {ChangeEvent, useEffect, useState} from 'react'
import {LoginInitialStateType} from "../../../../bll/reducers/login-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useHistory, useParams} from "react-router-dom";
import {AppRootStateType} from "../../../../bll/store";
import {authTC} from "../../../../bll/reducers/profile-reducer";
import {RequestStatusType} from "../../../../bll/reducers/app-reduser";
import {createNewCardTC, deleteCardTC, getNewCardsTC, getNewValueForCard} from '../../../../bll/reducers/cards-reducer';
import {Cards} from "./Cards";
import {CardType, newValueCardType} from "../../../../dal/packs/cardsAPI";
import {NewCardType} from "./AddNewCard/AddNewCardContainer";

export const CardsContainer = () => {

    const dispatch = useDispatch()
    const auth = useSelector<AppRootStateType, LoginInitialStateType>(state => state.login)
    const loading = useSelector<AppRootStateType, RequestStatusType>(state => state.app.requestStatus)
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
    const idUserPack = useSelector<AppRootStateType, string>(state => state.cards.idUserCards)
    const disableButton = useSelector<AppRootStateType, boolean>(state => state.cards.buttonDisable)

    //createNewCard
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [grade, setGrade] = useState(0)

    //newValue
    const [newQuestion, setNewQuestion] = useState('')
    const [newAnswer, setNewAnswer] = useState('')

    const {_id} = useParams<{ _id: string }>()
    const history = useHistory()

    //createNewCard
    const card: NewCardType = {
        cardsPack_id: _id,
        question: question,
        answer: answer,
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

    //createCard
    const addNewCard = () => {
        dispatch(createNewCardTC(card))
    }
    const onChangeValueQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const onChangeValueAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    //changeValueCard
    const editValueCard = (idCard: string) => {
        const newValueCard: newValueCardType = {
            _id: idCard,
            question: newQuestion,
            answer: newAnswer
        }
        dispatch(getNewValueForCard(newValueCard))
    }
    const onChangeChangeValueQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewQuestion(e.currentTarget.value)
    }
    const onChangeNewCommentsHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
               idUser={auth.dataUser?._id}
               idUserPack={idUserPack}
               disableButton={disableButton}

               onChangeNewValueAnswerHandler={onChangeValueQuestionHandler}
               onChangeNewValueQuestionHandler={onChangeValueAnswerHandler}
               addNewCard={addNewCard}

               onChangeChangeValueQuestionHandler={onChangeChangeValueQuestionHandler}
               onChangeNewCommentsHandler={onChangeNewCommentsHandler}
               editValueCard={editValueCard}
        />
    )
}