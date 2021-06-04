import React from 'react'
import s from './PacksContainer.module.scss'
import {CardsPacksType} from "../../../bll/reducers/cardsPacks-reducer";

type CardsPackPropsType = {
    cardsPacks: CardsPacksType[]
    removeCardsPack: (packId: string) => void
    updateCardsPack: (packId: string) => void
}

export const CardsPack: React.FC<CardsPackPropsType> = (props) => {
    return (
        <div >
            {
                props.cardsPacks.map(p => {

                    const removeCardsPack = () => {
                        props.removeCardsPack(p._id)
                    }
                    const updateCardsPack = () => {
                        props.updateCardsPack(p._id)
                    }

                    return (
                        <div className={s.rowColor} key={p.user_id}>
                            <div className={s.item}>{p.name}</div>
                            <div className={s.item}>{p.cardsCount}</div>
                            <div className={s.item}>{p.updated}</div>
                            <div className={s.item}>{p.user_name}</div>
                            <div className={s.item}>
                                <button onClick={removeCardsPack}>delete</button>
                                <button onClick={updateCardsPack}>update</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}