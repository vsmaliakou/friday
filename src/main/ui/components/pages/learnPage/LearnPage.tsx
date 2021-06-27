import React, {useEffect, useState} from "react";
import s from './LearnPage.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {CardType} from "../../../../dal/packs/cardsAPI";
import {AppRootStateType} from "../../../../bll/store";
import {getNewCardsTC, setCardsPackIdAC} from "../../../../bll/reducers/cards-reducer";
import Button from "../../../common/Button/Button";

const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer'];

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    return cards[res.id + 1];
}

export const LearnPage = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const {cards} = useSelector((store: AppRootStateType) => store.cards);
    const {_id} = useParams<{ _id: string }>()

    const [card, setCard] = useState<CardType>({
        answer: 'answer fake',
        answerImg: '',
        answerVideo: '',
        cardsPack_id: '',
        comments: '',
        created: '',
        grade: 0,
        more_id: '',
        question: 'question fake',
        questionImg: '',
        questionVideo: '',
        rating: 0,
        shots: 0,
        type: '',
        updated: '',
        user_id: '',
        __v: 0,
        _id: 'fake'
    });

    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        if (first) {
            dispatch(setCardsPackIdAC(_id))
            dispatch(getNewCardsTC());
            setFirst(false);
        }
        if (cards.length > 0) setCard(getCard(cards));
        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [dispatch, _id, cards, first]);

    const onNext = () => {
        setIsChecked(false);
        if (cards.length > 0) {
            setCard(getCard(cards));
        } else {
        }
    }
    const closeLearnPage = () => {
        history.push('/packs')
    }

    return (
        <div className={s.card}>
            <div className={s.titleWrap}>
                <h2 className={s.title}>Learn “Pack Name”</h2>
            </div>
            <div className={s.spanWrap}>
                <span className={s.span}> <strong>Question: </strong>“{card.question}”</span>
            </div>
            {isChecked
                ? <>
                    <div className={s.spanWrap}>
                        <span className={s.span}> <strong>Answer: </strong>“{card.answer}”</span>
                    </div>
                    <form className={s.form}>
                        <span className={s.listSpan}>Rate yourself:</span>
                        <ul className={s.list}>
                            {grades.map((g, i) => (
                                <li className={s.item} key={'grade-' + i}>
                                    <input className={s.input} name="q" type="radio" id="1"/>
                                    <label className={s.label} htmlFor="1">{g}</label>
                                </li>
                            ))}
                        </ul>
                    </form>
                    <div className={s.btnWrap}>
                        <Button className={s.btn} onClick={closeLearnPage}>Cancel</Button>
                        <Button className={s.btn} onClick={onNext}>Next</Button>
                    </div>
                </>
                : <div className={s.btnWrap}>
                    <Button className={s.btn} onClick={closeLearnPage}>Cancel</Button>
                    <Button className={s.btn} onClick={() => setIsChecked(true)}>Show answer</Button>
                </div>
            }
        </div>
    )
}
