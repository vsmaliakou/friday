import React, {ChangeEvent, useState} from 'react'
import {CardType} from '../../../../dal/packs/cardsAPI';
import {AddWindow} from "../../../common/AddWindow/AddWindow";
import s from "../packListPage/packList/cardsPacks/PacksContainer.module.scss";

type CardsPropsType = {
    cards: Array<CardType>
    deleteCard: (idCard: string) => void
    back: () => void
    idUser: string | undefined
    onChangeNewValueAnswerHandler: (e: ChangeEvent<HTMLInputElement>) => void
    onChangeNewValueQuestionHandler: (e: ChangeEvent<HTMLInputElement>) => void
    addNewCard: () => void
    onChangeChangeValueQuestionHandler: (e: ChangeEvent<HTMLInputElement>) => void
    onChangeNewCommentsHandler: (e: ChangeEvent<HTMLInputElement>) => void
    editValueCard: (idCard: string) => void
    disableButton: boolean
    idUserPack: string
}

export const Cards: React.FC<CardsPropsType> = props => {

    const {
        idUser,
        cards,
        deleteCard,
        disableButton,
        idUserPack,
        onChangeNewValueAnswerHandler, onChangeNewValueQuestionHandler, addNewCard,
        back,
        onChangeChangeValueQuestionHandler, onChangeNewCommentsHandler, editValueCard
    } = props

    const [addWinOpened, setAddWinOpened] = useState(false)
    const [addWinEdit, setAddWinEdit] = useState(false)

    const openWindowAddCard = () => {
        setAddWinOpened(true)
    }
    const openWindowEditCard = () => {
        setAddWinEdit(true)
    }

    const addCardCallback = () => {
        setAddWinOpened(false)
        addNewCard()
    }
    const closeWindowCallback = () => {
        // back()
        setAddWinOpened(false)
        setAddWinEdit(false)
    }

    return (
        <>
            <div>
                {idUserPack === idUser
                    ? <>
                        <button onClick={openWindowAddCard}>Add new card</button>

                        {addWinOpened && <AddWindow title={'Add new card'}
                                                    placeholder={'Name'}
                                                    newTitleCallback={onChangeNewValueQuestionHandler}
                                                    answerCallback={onChangeNewValueAnswerHandler}
                                                    closeCallback={closeWindowCallback}
                                                    addCallback={addCardCallback}
                        />}
                    </>
                    : null
                }
            </div>
            {cards?.length <= 0

                ? <p>This pack is empty. Click add new card to fill this pack</p>

                : cards?.map(cards => {

                    const onClickHandleDelete = () => {
                        deleteCard(cards._id)
                    }
                    const onClickHandleEdit = () => {
                        editValueCard(cards._id)
                        setAddWinEdit(false)
                    }

                    return <tr className={s.row}
                               key={cards._id}>
                        <th className={s.col}><span className={s.colSpan}>{cards.question}</span></th>
                        <th className={s.col}><span className={s.colSpan}>{cards.answer}</span></th>
                        <th className={s.col}><span className={s.colSpan}>{cards.updated}</span></th>
                        <th className={s.col}><span className={s.colSpan}>{cards.grade}</span></th>

                        {idUserPack === idUser

                            ? <div className={s.item}>

                                <button onClick={onClickHandleDelete}
                                        disabled={disableButton}>Delete
                                </button>

                                <button onClick={openWindowEditCard}
                                        disabled={disableButton}>Edit
                                </button>

                                {addWinEdit && <AddWindow title={'Change card'}
                                                          placeholder={'Name'}
                                                          newTitleCallback={onChangeChangeValueQuestionHandler}
                                                          answerCallback={onChangeNewCommentsHandler}
                                                          closeCallback={closeWindowCallback}
                                                          addCallback={onClickHandleEdit}
                                />}

                            </div>

                            : null
                        }
                    </tr>

                })
            }
        </>
    )
}