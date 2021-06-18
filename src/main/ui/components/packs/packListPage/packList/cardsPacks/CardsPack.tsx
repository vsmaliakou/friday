import React, {useState} from 'react'
import s from './PacksContainer.module.scss'
import {NavLink} from 'react-router-dom';
import {LoginInitialStateType} from "../../../../../../bll/reducers/login-reducer";
import {DeleteWindow} from "../../../../../common/DeleteWindow/DeleteWindow";
import {CardsPacksType} from "../../../../../../dal/packs/cardsPacksAPI";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../../../bll/store";
import {removeCardsPackTC, updateCardsPackTC} from "../../../../../../bll/reducers/cardsPacks-reducer";

type CardsPackPropsType = {
    auth: LoginInitialStateType
}

export const CardsPack: React.FC<CardsPackPropsType> = ({auth}) => {

    const cardsPacks = useSelector<AppRootStateType, Array<CardsPacksType>>(state => state.packs.cardsPacks)

    const [deleteWinOpened, setDeleteWinOpened] = useState(false)
    const [removePackId, setRemovePackId] = useState("")

    const dispatch = useDispatch()

    const removeCallback = () => {
        dispatch(removeCardsPackTC(removePackId))
        setDeleteWinOpened(false)
    }
    const closeCallback = () => {
        setDeleteWinOpened(false)
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
                        dispatch(updateCardsPackTC(p._id, "new name"))
                    }

                    return <tr className={s.row}>
                        <th className={s.col}>
                            <span className={s.colSpan}>{p.name}</span>
                        </th>
                        <th className={s.col}>
                            <span className={s.colSpan}>{p.cardsCount}</span>
                        </th>
                        <th className={s.col}>
                            <span className={s.colSpan}>{p.updated}</span>
                        </th>
                        <th className={s.col}>
                            <span className={s.colSpan}>{p.user_name}</span>
                        </th>
                        {
                            auth.dataUser?._id === p.user_id
                                ? <div className={s.item}>
                                    <button className={s.btn} onClick={deleteWindowOpened} style={{backgroundColor: "#F1453D"}}>Delete</button>
                                    <button className={s.btn} onClick={updatePack} style={{backgroundColor: "#D7D8EF"}}>Dte</button>
                                    <NavLink to={`/packs/${p._id}`}>Cards</NavLink>
                                </div>
                                : <div className={s.item}>
                                    <NavLink to={`/packs/${p._id}`}>Cards</NavLink>
                                </div>
                        }
                        {deleteWinOpened && <DeleteWindow
                            title="Delete Pack"
                            name="pack"
                            closeCallback={closeCallback}
                            removeCallback={removeCallback}
                        />}
                    </tr>
                })
            }
        </>
    )
}