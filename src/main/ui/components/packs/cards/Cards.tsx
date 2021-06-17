import React from 'react'
import {LoadingSvg} from "../../../common/loading/LoadingSvg";
import {NavLink, useParams} from "react-router-dom";
import {RequestStatusType} from "../../../../bll/reducers/app-reduser";
import {CardType} from '../../../../dal/packs/cardsAPI';
import {AppRootStateType} from "../../../../bll/store";
import {useSelector} from 'react-redux';

type CardsPropsType = {
    loading: RequestStatusType
    cards: Array<CardType>
    deleteCard: (idCard: string) => void
    back: () => void
    id: string
    idUser: string | undefined
}

export const Cards: React.FC<CardsPropsType> = props => {

    const {
        idUser,
        loading,
        cards,
        deleteCard,
        id
    } = props

    const idPack = useSelector<AppRootStateType, string | undefined>(state => state.cards.cards[0]?.user_id)
    const disableButton = useSelector<AppRootStateType, boolean>(state => state.cards.buttonDisable)

    console.log(`idPack-${idPack}`)
    console.log(`idUser-${idUser}`)

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

                    {idUser
                        ? <NavLink to={`/packs/${id}/newCard`}>Add new card</NavLink>
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