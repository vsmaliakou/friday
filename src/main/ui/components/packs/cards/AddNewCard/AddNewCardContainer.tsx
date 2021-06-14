import React, {ChangeEvent, useState} from 'react';
import s from "./_addNewCard.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../../bll/store";
import {LoginInitialStateType} from "../../../../../bll/reducers/login-reducer";
import {RequestStatusType} from "../../../../../bll/reducers/app-reduser";
import {CardsType, CardType} from "../../../../../dal/packs/cardsAPI";
import {useHistory, useParams} from 'react-router-dom';
import {createNewCardTC} from '../../../../../bll/reducers/cards-reducer';

export const AddNewCardContainer = () => {

    const [newQuestion, setNewQuestion] = useState('')
    const [newAnswer, setNewAnswer] = useState('')
    const [grade, setGrade] = useState(0)

    const dispatch = useDispatch()
    const history = useHistory()
    const {_id} = useParams<{ _id: string }>()

    const auth = useSelector<AppRootStateType, LoginInitialStateType>(state => state.login)
    const loading = useSelector<AppRootStateType, RequestStatusType>(state => state.app.requestStatus)
    const cards = useSelector<AppRootStateType, Array<CardsType>>(state => state.cards.cards)

    const card: CardType = {
        cardsPack_id: _id,
        question: newQuestion,
        answer: newAnswer,
        grade: grade
    }

    const addNewCard = () => {
        // if () {
        dispatch(createNewCardTC({cardsPack_id, question, answer, grade}))
        // }
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

    return (
        <div className={s.card}>

            <h2 className={s.title}>Card Info</h2>

            <form className={s.inputWrap}>

                <label className={s.label}>Question</label>
                <input className={s.input}
                       type="text"
                       onChange={onChangeNewValueQuestionHandler}
                />
                <button className={s.btnForm}
                >+ Attach file
                </button>

            </form>

            <form className={s.inputWrap}>

                <label className={s.label}>Answer</label>
                <input className={s.input}
                       type="text"
                       onChange={onChangeNewValueAnswerHandler}
                />
                <button className={s.btnForm}
                >+ Attach file
                </button>

            </form>

            <div className={s.btnWrap}>
                <button className={s.btn}
                        onClick={back}>Cancel
                </button>
                <button className={s.btn}
                        onClick={addNewCard}>Save
                </button>

            </div>

        </div>
        // <AddNewCard/>
    )
}

