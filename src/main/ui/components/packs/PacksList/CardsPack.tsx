import React from 'react'
import s from './_cardPacks.module.scss'
import {CardsPacksType} from "../../../../dal/packs/cardsPacksAPI";
import {NavLink} from 'react-router-dom';

type CardsPackPropsType = {
    cardsPacks: CardsPacksType[]
    removeCardsPack: (packId: string) => void
    updateCardsPack: (packId: string) => void
}

export const CardsPack: React.FC<CardsPackPropsType> = (props) => {
    return (
        <tr>
            {
                props.cardsPacks.map(p => {

                    const removeCardsPack = () => {
                        props.removeCardsPack(p._id)
                    }
                    const updateCardsPack = () => {
                        props.updateCardsPack(p._id)
                    }

                    return (

                        <tr className={s.rowColor} key={p._id}>
                                <th className={s.item}>{p.name}</th>
                                <th className={s.item}>{p.cardsCount}</th>
                                <th className={s.item}>{p.updated}</th>
                                <th className={s.item}>{p.user_name}</th>
                                <th className={s.item}>
                                    <button onClick={removeCardsPack}>delete</button>
                                    <button onClick={updateCardsPack}>update</button>
                                    <NavLink to={`/packs/${p._id}`}>Cards</NavLink>
                            </th>

                        </tr>

                    )
                })
            }
        </tr>
    )
}