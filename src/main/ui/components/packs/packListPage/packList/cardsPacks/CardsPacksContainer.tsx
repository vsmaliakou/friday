import React from 'react'
import s from './PacksContainer.module.scss'
import {CardsPack} from "./CardsPack";
import {LoginInitialStateType} from "../../../../../../bll/reducers/login-reducer";
import {CardsPacksType} from "../../../../../../dal/packs/cardsPacksAPI";

type CardsPacksContainerType = {
    cardsPacks: Array<CardsPacksType>
    auth: LoginInitialStateType
    addWindowOpened: () => void
    removeCardsPack: (packId: string) => void
    updateCardsPack: (packId: string) => void
}

export const CardsPacksContainer: React.FC<CardsPacksContainerType> = (props) => {
    return (
        <table className={s.table}>
            <tr className={s.title}>
                <th className={s.col}>Name</th>
                <th className={s.col}>Cards</th>
                <th className={s.col}>
                    <select className={s.select}>
                        <option>Last Updated</option>
                        <option>One Updated</option>
                    </select>
                </th>
                <th className={s.col}>Created by</th>
                <button onClick={props.addWindowOpened}>add</button>
            </tr>
            <CardsPack
                auth={props.auth}
                cardsPacks={props.cardsPacks}
                removeCardsPack={props.removeCardsPack}
                updateCardsPack={props.updateCardsPack}
            />
        </table>
    )
}