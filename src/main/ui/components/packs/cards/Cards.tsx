import React, {ChangeEvent, useState} from 'react'
import {LoadingSvg} from "../../../common/loading/LoadingSvg";
import {NavLink} from "react-router-dom";
import {RequestStatusType} from "../../../../bll/reducers/app-reduser";
import {CardType} from '../../../../dal/packs/cardsAPI';
import {AppRootStateType} from "../../../../bll/store";
import {useSelector} from 'react-redux';
import {AddWindow} from "../../../common/AddWindow/AddWindow";

type CardsPropsType = {
    loading: RequestStatusType
    cards: Array<CardType>
    deleteCard: (idCard: string) => void
    back: () => void
    id: string
    idUser: string | undefined
    onChangeNewValueAnswerHandler: (e: ChangeEvent<HTMLInputElement>) => void
    onChangeNewValueQuestionHandler: (e: ChangeEvent<HTMLInputElement>) => void
    addNewCard: () => void
}

export const Cards: React.FC<CardsPropsType> = props => {

    const {
        idUser,
        loading,
        cards,
        deleteCard,
        id,
        onChangeNewValueAnswerHandler,
        onChangeNewValueQuestionHandler,
        addNewCard,
        back
    } = props

    const [addWinOpened, setAddWinOpened] = useState(false)

    const idPack = useSelector<AppRootStateType, string | undefined>(state => state.cards.cards[0]?.user_id)
    const disableButton = useSelector<AppRootStateType, boolean>(state => state.cards.buttonDisable)

    console.log(`idPack-${idPack}`)
    console.log(`idUser-${idUser}`)

    const openWindowAddCard = () => {
        setAddWinOpened(true)
    }

    const addCardCallback = () => {
        setAddWinOpened(true)
        addNewCard()
    }
    const closeWindowCallback = () => {
        setAddWinOpened(false)
        back()
    }

    return (
        <div>

            {loading === "loading" ? <LoadingSvg/> : null}

            <div>
                <div>

                    <NavLink to={'/packs'}>
                        <img src="arrow" alt=""/>
                        Pack Name
                    </NavLink>

                    {/* === idUser && idPack === undefined*/}

                    <button onClick={openWindowAddCard}>Add new card</button>

                    {addWinOpened && <AddWindow title={'Add new card'}
                                                placeholder={'Name'}
                                                newTitleCallback={onChangeNewValueQuestionHandler}
                                                answerCallback={onChangeNewValueAnswerHandler}
                                                closeCallback={closeWindowCallback}
                                                addCallback={addCardCallback}
                    />
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

                            return (

                                <div key={cards._id}>

                                    <div>Question:{cards.question}</div>
                                    <div>Answer:{cards.answer}</div>
                                    <div>Last Updated:{cards.updated}</div>
                                    <div>Grade:{cards.grade}</div>

                                    {idPack === idUser

                                        ? <div> Actions:
                                            <button onClick={onClickHandleDelete}
                                                    disabled={disableButton}
                                            >Delete </button>
                                            <NavLink to={'/#'}>
                                                <button disabled={disableButton}
                                                >Edit
                                                </button>
                                            </NavLink>
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