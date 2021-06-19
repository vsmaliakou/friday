import React, {ChangeEvent, useState} from 'react'
import {LoadingSvg} from "../../../common/Loading/LoadingSvg";
import {NavLink} from "react-router-dom";
import {RequestStatusType} from "../../../../bll/reducers/app-reduser";
import {CardType} from '../../../../dal/packs/cardsAPI';
import {AddWindow} from "../../../common/AddWindow/AddWindow";
import s from "../packListPage/packList/cardsPacks/PacksContainer.module.scss";

type CardsPropsType = {
    loading: RequestStatusType
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
        loading,
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
        back()
        setAddWinOpened(false)
    }

    return (
        <div>

            {loading === "loading" ? <LoadingSvg/> : null}

            <div className={s.card}>
                <div>

                    <NavLink to={'/packs'}>
                        <img src="arrow" alt=""/>
                        Pack Name
                    </NavLink>

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
                <div>
                    <input placeholder="search..."/>
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

                            return (

                                <div key={cards._id}
                                     className={s.rowColor} style={{backgroundColor: "rgb(238, 218, 218)"}}>

                                    <div className={s.item}>Question:{cards.question}</div>
                                    <div className={s.item}>Answer:{cards.answer}</div>
                                    <div className={s.item}>Last Updated:{cards.updated}</div>
                                    <div className={s.item}>Grade:{cards.grade}</div>

                                    {idUserPack === idUser

                                        ? <div className={s.item}> Actions:

                                            <button onClick={onClickHandleDelete}
                                                    disabled={disableButton}
                                            >Delete
                                            </button>

                                            <button onClick={openWindowEditCard}
                                                    disabled={disableButton}
                                            >Edit
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

                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}