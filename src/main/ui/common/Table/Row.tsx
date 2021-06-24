import React, {ChangeEvent, useState} from 'react'
import s from './Table.module.scss'
import {NavLink} from 'react-router-dom';
import {LoginInitialStateType} from "../../../bll/reducers/login-reducer";
import {DeleteWindow} from "../DeleteWindow/DeleteWindow";
import {CardsPacksType} from "../../../dal/packs/cardsPacksAPI";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";
import {removeCardsPackTC, updateCardsPackTC} from "../../../bll/reducers/cardsPacks-reducer";
import {AddWindow} from "../AddWindow/AddWindow";

type CardsPackPropsType = {
    auth: LoginInitialStateType
}

export const Row: React.FC<CardsPackPropsType> = ({auth}) => {

    const cardsPacks = useSelector<AppRootStateType, Array<CardsPacksType>>(state => state.packs.cardsPacks)

    const [deleteWinOpened, setDeleteWinOpened] = useState(false)
    const [updateWinOpened, setUpdateWinOpened] = useState(false)
    const [removePackId, setRemovePackId] = useState("")
    const [name, setName] = useState("")

    const dispatch = useDispatch()

    const removeCallback = () => {
        dispatch(removeCardsPackTC(removePackId))
        setDeleteWinOpened(false)
    }
    const newTitleCallback = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const updateCallback = () => {
        dispatch(updateCardsPackTC(removePackId, name))
        setUpdateWinOpened(false)
    }
    const closeCallback = () => {
        setDeleteWinOpened(false)
        setUpdateWinOpened(false)
    }

    return (
        <>
            {
                cardsPacks.map(p => {

                    const deleteWindowOpened = () => {
                        setDeleteWinOpened(true)
                        setRemovePackId(p._id)
                    }
                    const updatePack = () => {
                        setUpdateWinOpened(true)
                        setRemovePackId(p._id)
                    }

                    return <tr className={s.row}>
                        <th className={s.col}>
                            <NavLink to={`/packs/${p._id}`} className={s.colSpan}>{p.name}</NavLink>
                        </th>
                        <th className={s.col}>
                            <span className={s.colSpan}>{p.cardsCount}</span>
                        </th>
                        <th className={s.col}>
                            <span className={s.colSpan}>{p.updated}</span>
                        </th>
                        <th className={s.col}>
                            <NavLink to={`/profile/${p.user_id}`} className={s.colSpan}>{p.user_name}</NavLink>
                        </th>
                        {
                            auth.dataUser?._id === p.user_id
                                ? <th className={s.item}>
                                    <button className={s.btn} onClick={deleteWindowOpened}
                                            style={{backgroundColor: "#F1453D"}}>Delete
                                    </button>
                                    <button className={s.btn} onClick={updatePack}
                                            style={{backgroundColor: "#D7D8EF"}}>Edit
                                    </button>
                                    {p.cardsCount > 0 && <NavLink to={`/learn/${p._id}`} className={s.link}>Learn</NavLink>}
                                </th>
                                : <th className={s.item}>
                                    {p.cardsCount > 0 && <NavLink to={`/learn/${p._id}`} className={s.link}>Learn</NavLink>}
                                </th>
                        }
                        {deleteWinOpened && <DeleteWindow
                            title="Delete Pack"
                            name="pack"
                            closeCallback={closeCallback}
                            removeCallback={removeCallback}
                        />}
                        {updateWinOpened && <AddWindow
                            title={'Edit pack name'}
                            placeholder={'New pack name'}
                            newTitleCallback={newTitleCallback}
                            closeCallback={closeCallback}
                            addCallback={updateCallback}
                        />}
                    </tr>
                })
            }
        </>
    )
}