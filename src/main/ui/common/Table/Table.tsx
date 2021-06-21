import React, {ChangeEvent, useState} from 'react'
import s from './Table.module.scss'
import {Row} from "./Row";
import {LoginInitialStateType} from "../../../bll/reducers/login-reducer";
import {AddWindow} from "../AddWindow/AddWindow";
import {addNewCardsPackTC} from "../../../bll/reducers/cardsPacks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";

type CardsPacksContainerType = {
    auth: LoginInitialStateType
}

export const Table: React.FC<CardsPacksContainerType> = ({auth}) => {

    const userId = useSelector<AppRootStateType, string>(state => state.packs.user_id)

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
                {userId === auth.dataUser?._id
                    ? <th className={s.col}>
                        <button className={s.btnAdd} onClick={addWindowOpened}>Add</button>
                    </th>
                    : <th className={s.col}>Actions</th>
                }
            </tr>
            <Row
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