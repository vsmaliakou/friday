import React, {useEffect} from 'react'
import s from './PacksContainer.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {
    addNewCardsPackTC,
    CardsPacksType,
    getCardsPacksTC,
    removeCardsPackTC,
    updateCardsPackTC
} from "../../../../bll/reducers/cardsPacks-reducer";
import {AppRootStateType} from "../../../../bll/store";
import {CardsPack} from "./CardsPack";

export const CardsPacksContainer = () => {
    const newCardsPack = {
        name: "no Name",
        path: "/def",
        grade: 0,
        shots: 0,
        rating: 0,
        deckCover: "url or base64",
        private: false,
        type: "pack"
    }

    const cardsPacks = useSelector<AppRootStateType, Array<CardsPacksType>>(state => state.packs.cardsPacks)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCardsPacksTC())
    }, [])

    const addNewCardsPack = () => {
        dispatch(addNewCardsPackTC(newCardsPack))
    }
    const removeCardsPack = (packId: string) => {
        dispatch(removeCardsPackTC(packId))
    }
    const updateCardsPack = (packId: string) => {
        dispatch(updateCardsPackTC(packId, "new name"))

    }

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
                    {/* <button onClick={addNewCardsPack}>add</button> */}
                    <th className={s.col}>Actions</th>
                </tr>
                {/* <CardsPack
                    cardsPacks={cardsPacks}
                    removeCardsPack={removeCardsPack}
                    updateCardsPack={updateCardsPack}
                /> */}

                    <tr className={s.row}>
                        <th className={s.col}>
                            <span className={s.colSpan}>Pack Name</span>
                        </th>
                        <th className={s.col}>
                            <span className={s.colSpan}>8</span>
                        </th>
                        <th className={s.col}>
                           <span className={s.colSpan}>18.03.2021</span>
                        </th>
                        <th className={s.col}>
                            <span className={s.colSpan}>Ivan Ivanov</span>
                        </th>
                        
                        <th className={s.col}>
                            <button className={s.btn} style={{backgroundColor:"#F1453D"}}>Delete</button>
                            <button className={s.btn} style={{backgroundColor:"#D7D8EF"}}>Dte</button>
                            <button className={s.btn} style={{backgroundColor:"#D7D8EF"}}>Dee</button>
                        </th>
                    </tr>
                    
                  
            </table>
        
    )
}