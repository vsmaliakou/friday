import React from 'react'
import { Packs } from './Packs'
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {getPacksTC, CardPacksType} from "../../../bll/reducers/packs-reducer";
import {AppRootStateType} from "../../../bll/store";

export const PacksContainer = () => {

    const packs = useSelector<AppRootStateType, Array<CardPacksType>>(state => state.packs)

    const dispatch = useDispatch()

    const onClickGetPacks = () => {
        dispatch(getPacksTC())
    }

    return (
        <div>
            <Packs/>
            <SuperButton onClick={onClickGetPacks}>Get packs</SuperButton>
            {
                packs.map(p => {
                    return <div key={p.user_id}>{p.user_name}</div>
                })
            }
        </div>
    )
}