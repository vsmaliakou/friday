import React, {useState} from 'react'
import s from './PacksContainer.module.scss'
import {NavLink} from 'react-router-dom';
import {LoginInitialStateType} from "../../../../../../bll/reducers/login-reducer";
import {DeleteWindow} from "../../../../../common/DeleteWindow/DeleteWindow";
import {CardsPacksType} from "../../../../../../dal/packs/cardsPacksAPI";

type CardsPackPropsType = {
    auth: LoginInitialStateType
    cardsPacks: CardsPacksType[]
    removeCardsPack: (packId: string) => void
    updateCardsPack: (packId: string) => void
}

export const CardsPack: React.FC<CardsPackPropsType> = (props) => {

    const [deleteWinOpened, setDeleteWinOpened] = useState(false)
    const [removePackId, setRemovePackId] = useState("")

    const removeCallback = () => {
        props.removeCardsPack(removePackId)
        setDeleteWinOpened(false)
    }
    const closeCallback = () => {
        setDeleteWinOpened(false)
    }

    return (
        <>
            {
                props.cardsPacks.map(p => {

                    const deleteWindowOpened = () => {
                        setDeleteWinOpened(true)
                        setRemovePackId(p._id)
                    }
                    const updatePack = () => {
                        props.updateCardsPack(p._id)
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
                            props.auth.dataUser?._id === p.user_id
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