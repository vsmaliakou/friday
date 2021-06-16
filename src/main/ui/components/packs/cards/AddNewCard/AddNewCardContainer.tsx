import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import {useHistory, useParams} from 'react-router-dom';
import {createNewCardTC} from '../../../../../bll/reducers/cards-reducer';
import {AddWindow} from "../../../../common/AddWindow/AddWindow";

export type NewCardType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    rating?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    type?: string
}

export const AddNewCardContainer = () => {

    const [newQuestion, setNewQuestion] = useState('')
    const [newAnswer, setNewAnswer] = useState('')
    const [grade, setGrade] = useState(0)

    const dispatch = useDispatch()
    const history = useHistory()
    const {_id} = useParams<{ _id: string }>()

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

    const back = () => {
        history.push(`/packs/${_id}`);
    }

    const addNewCard = () => {
        dispatch(createNewCardTC(card))
        // {cardsPack_id, question, answer, grade}
        back()
    }

    const onChangeNewValueQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewQuestion(e.currentTarget.value)
    }
    const onChangeNewValueAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewAnswer(e.currentTarget.value)
    }

    return (
        <AddWindow title={'Card Info'}
                   placeholder={'Question'}
                   newTitleCallback={onChangeNewValueQuestionHandler}
                   answerCallback={onChangeNewValueAnswerHandler}
                   closeCallback={back}
                   addCallback={addNewCard}
        />
    )
}

