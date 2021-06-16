import React from 'react'
import {LoadingSvg} from "../../../common/loading/LoadingSvg";
import {NavLink, useParams} from "react-router-dom";
import {RequestStatusType} from "../../../../bll/reducers/app-reduser";
import {CardType} from '../../../../dal/packs/cardsAPI';

type CardsPropsType = {
    idUser: string | undefined
    idPack: string | undefined
    loading: RequestStatusType
    cards: Array<CardType>
    deleteCard: (idCard: string) => void
}

export const Cards: React.FC<CardsPropsType> = props => {

    const {
        idUser,
        idPack,
        loading,
        cards,
        deleteCard
    } = props

    const {_id} = useParams<{ _id: string }>()

    return (
        <div>

            {loading === "loading" ? <LoadingSvg/> : null}

            <div>
                <div>

                    <NavLink to={'/packs'}>
                        <img src="arrow" alt=""/>
                        Pack Name
                    </NavLink>

                    {/*{idPack === idUser || undefined*/}
                    <NavLink to={`/packs/${_id}/newCard`}>Add new card</NavLink>
                    {/*: null*/}
                    {/*}*/}

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

                                    {idPack === idUser || undefined

                                        ? <div> Actions:
                                            <button onClick={onClickHandleDelete}>Delete
                                            </button>
                                            <NavLink to={'/#'}>
                                                <button>Edit</button>
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