import React, {useState} from 'react'
import s from './PacksContainer.module.scss'
import {CardsPacksType} from "../../../../../../dal/packs/cardsPacksAPI";
import {NavLink} from 'react-router-dom';
import {LoginInitialStateType} from "../../../../../../bll/reducers/login-reducer";
import {DeleteWindow} from "../../../../../common/DeleteWindow/DeleteWindow";

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
        <div>
            {
                props.cardsPacks.map(p => {

                    const deleteWindowOpened = () => {
                        setDeleteWinOpened(true)
                        setRemovePackId(p._id)
                    }
                    const updatePack = () => {
                        props.updateCardsPack(p._id)
                    }

                    return (
                        <div className={s.rowColor} key={p._id}>
                            <div className={s.item}>{p.name}</div>
                            <div className={s.item}>{p.cardsCount}</div>
                            <div className={s.item}>{p.updated}</div>
                            <div className={s.item}>{p.user_name}</div>
                            {
                                props.auth.dataUser?._id === p.user_id
                                    ? <div className={s.item}>
                                        <button onClick={deleteWindowOpened}>delete</button>
                                        <button onClick={updatePack}>update</button>
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
                        </div>
                    )
                })
            }
        </div>
    )
}