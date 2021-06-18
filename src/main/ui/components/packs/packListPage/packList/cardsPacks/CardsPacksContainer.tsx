import React, {ChangeEvent, useState} from 'react'
import s from './PacksContainer.module.scss'
import {CardsPack} from "./CardsPack";
import {LoginInitialStateType} from "../../../../../../bll/reducers/login-reducer";
import {AddWindow} from "../../../../../common/AddWindow/AddWindow";
import {addNewCardsPackTC} from "../../../../../../bll/reducers/cardsPacks-reducer";
import {useDispatch} from "react-redux";

type CardsPacksContainerType = {
    auth: LoginInitialStateType
}

export const CardsPacksContainer: React.FC<CardsPacksContainerType> = ({auth}) => {

    const [addWindow, setAddWindow] = useState(false)
    const [name, setName] = useState("")

    const dispatch = useDispatch()

    const addWindowOpened = () => {
        setAddWindow(true)
    }
    const addNewPackTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const addCallback = () => {
        dispatch(addNewCardsPackTC({name}))
        setAddWindow(false)
    }
    const closeCallback = () => {
        setAddWindow(false)
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
                <button onClick={addWindowOpened}>add</button>
            </tr>
            <CardsPack
                auth={auth}
            />
            {addWindow && <AddWindow
                title="Add new pack"
                placeholder="Name"
                newTitleCallback={addNewPackTitle}
                closeCallback={closeCallback}
                addCallback={addCallback}
            />}
        </table>
    )
}