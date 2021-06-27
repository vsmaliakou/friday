import React, {ChangeEvent, useState} from 'react'
import s from "../../../common/Table/Table.module.scss";
import {LoginInitialStateType} from "../../../../bll/reducers/login-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../bll/store";
import {createNewCardTC} from '../../../../bll/reducers/cards-reducer';
import {Cards} from "./Cards";
import {CardType} from "../../../../dal/packs/cardsAPI";
import {AddWindow} from "../../../common/AddWindow/AddWindow";
import Button from "../../../common/Button/Button";

type PropsType = {
    auth: LoginInitialStateType
    cardsPack_id: string
}

export const CardsContainer: React.FC<PropsType> = ({auth, cardsPack_id}) => {

    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
    const packUserId = useSelector<AppRootStateType, string>(state => state.cards.packUserId)

    const dispatch = useDispatch()

    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [addWinOpened, setAddWinOpened] = useState(false)

    const openWindowAddCard = () => {
        setAddWinOpened(true)
    }
    const addCardCallback = () => {
        dispatch(createNewCardTC({cardsPack_id, question, answer}))
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
                {packUserId === auth.dataUser?._id
                    ? <th className={s.col}>
                        <Button className={s.btnAdd} onClick={openWindowAddCard}>Add card</Button>
                    </th>
                    : null
                }
            </tr>
            <Cards
                cards={cards}
                idUser={auth.dataUser?._id}
                packUserId={packUserId}
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