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
        <div>
            <div className={s.card}>
                <div className={s.rowColor} style={{backgroundColor: "rgb(238, 218, 218)"}}>
                    <div className={s.item}>Name</div>
                    <div className={s.item}>Cards</div>
                    <div className={s.item}>
                        <select className={s.select}>
                            <option>Last Updated</option>
                            <option>One Updated</option>
                        </select>
                    </div>
                    <div className={s.item}>Created by</div>
                    <button onClick={props.addWindowOpened}>add</button>
                </div>
                <CardsPack
                    auth={props.auth}
                    cardsPacks={props.cardsPacks}
                    removeCardsPack={props.removeCardsPack}
                    updateCardsPack={props.updateCardsPack}
                />
            </div>
        </div>
    )
}