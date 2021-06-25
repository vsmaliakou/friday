import React, {ChangeEvent, useState} from 'react'
import s from "../../../common/Table/Table.module.scss";
import {CardType, newValueCardType} from '../../../../dal/packs/cardsAPI';
import {AddWindow} from "../../../common/AddWindow/AddWindow";
import {DeleteWindow} from "../../../common/DeleteWindow/DeleteWindow";
import {useDispatch} from "react-redux";
import {deleteCardTC, getNewValueForCardTC} from "../../../../bll/reducers/cards-reducer";
import RatingCard from '../../../common/Rating/RatingCard';

type CardsPropsType = {
    cards: Array<CardType>
    idUser: string | undefined
    packUserId: string
}

export const Cards: React.FC<CardsPropsType> = ({idUser, cards, packUserId}) => {

    const [deleteWinOpened, setDeleteWinOpened] = useState(false)
    const [addWinEdit, setAddWinEdit] = useState(false)
    const [removeCardId, setRemoveCardId] = useState("")
    const [newQuestion, setNewQuestion] = useState('')
    const [newAnswer, setNewAnswer] = useState('')

    const dispatch = useDispatch()

    const removeCallback = () => {
        dispatch(deleteCardTC(removeCardId))
        setDeleteWinOpened(false)
    }
    const onChangeNewQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setNewQuestion(e.currentTarget.value)
    }
    const onChangeNewAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setNewAnswer(e.currentTarget.value)
    }
    const onClickHandleEdit = () => {
        const newValueCard: newValueCardType = {
            _id: removeCardId,
            question: newQuestion,
            answer: newAnswer
        }
        dispatch(getNewValueForCardTC(newValueCard))
        setAddWinEdit(false)
    }
    const closeWindowCallback = () => {
        setDeleteWinOpened(false)
        setAddWinEdit(false)
    }

    return (
        <>
            {
                cards?.map(cards => {

                    const onClickHandleDelete = () => {
                        setDeleteWinOpened(true)
                        setRemoveCardId(cards._id)
                    }
                    const openWindowEditCard = () => {
                        setAddWinEdit(true)
                        setRemoveCardId(cards._id)
                    }

                    return <tr className={s.row} key={cards._id}>
                        <th className={s.col}><span className={s.colSpan}>{cards.question}</span></th>
                        <th className={s.col}><span className={s.colSpan}>{cards.answer}</span></th>
                        <th className={s.col}><span className={s.colSpan}>{cards.updated}</span></th>
                        <th className={s.col}><span className={s.colSpan}>
                            <RatingCard card_id={cards._id}
                                        grade={cards.grade}
                            />
                        </span></th>
                        {
                            packUserId === idUser
                                ? <th className={s.item}>
                                    <button
                                        className={s.btn}
                                        style={{backgroundColor: "#F1453D"}}
                                        onClick={onClickHandleDelete}
                                    >Delete
                                    </button>
                                    <button
                                        className={s.btn}
                                        style={{backgroundColor: "#D7D8EF"}}
                                        onClick={openWindowEditCard}                                    >Edit
                                    </button>
                                </th>
                                : null
                        }
                        {deleteWinOpened &&
                        <DeleteWindow
                            title="Delete Card"
                            name="card"
                            closeCallback={closeWindowCallback}
                            removeCallback={removeCallback}
                        />}
                        {addWinEdit &&
                        <AddWindow
                            title={'Change card'}
                            placeholder={'Name'}
                            newTitleCallback={onChangeNewQuestion}
                            answerCallback={onChangeNewAnswer}
                            closeCallback={closeWindowCallback}
                            addCallback={onClickHandleEdit}
                        />}
                    </tr>
                })
            }
        </>
    )
}