import React from 'react'
import s from './PacksContainer.module.css'
import {Packs} from './Packs'
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {getPacksTC, CardPacksType, addPacksTC} from "../../../bll/reducers/packs-reducer";
import {AppRootStateType} from "../../../bll/store";

export const PacksContainer = () => {

    const packs = useSelector<AppRootStateType, Array<CardPacksType>>(state => state.packs)

    const dispatch = useDispatch()

    const getPacks = () => {
        dispatch(getPacksTC())
    }
    const cardsPack = {
            name: "no Name",
            path: "/def",
            grade: 0,
            shots: 0,
            rating: 0,
            deckCover: "url or base64",
            private: false,
            type: "pack"
    }
    const addPack = () => {
        dispatch(addPacksTC(cardsPack))
    }

    return (
        <div>
            <Packs/>
            <SuperButton onClick={getPacks}>Get packs</SuperButton>
            <div className={s.tableHeader}>
                <span>Name</span>
                <span>cardsCount</span>
                <span>updated</span>
                <span>url</span>
                <button onClick={addPack}>add</button>
            </div>
            {
                packs.map(p => {
                    return (
                        <div className={s.userData}>
                            <div key={p.user_id}>{p.user_name}</div>
                            <div key={p.user_id}>{p.cardsCount}</div>
                            <div key={p.user_id}>{p.updated}</div>
                            <div key={p.user_id}>url</div>
                        </div>
                    )
                })
            }
        </div>
    )
}