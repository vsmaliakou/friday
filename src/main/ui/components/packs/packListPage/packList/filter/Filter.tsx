import React from 'react';
import s from './Filter.module.scss';
import {getCardsPacksTC, setUserIdAC} from "../../../../../../bll/reducers/cardsPacks-reducer";
import {useDispatch} from "react-redux";
import {LoginInitialStateType} from "../../../../../../bll/reducers/login-reducer";
import SuperDoubleRange from "../../../../../common/SuperDoubleRange/SuperDoubleRange";

type FilterPropsType = {
    auth: LoginInitialStateType
}

export const Filter: React.FC<FilterPropsType> = ({auth}) => {

    const dispatch = useDispatch()

    const getMyPacks = () => {
        if (auth.dataUser?._id) {
            dispatch(setUserIdAC(auth.dataUser._id))
            dispatch(getCardsPacksTC())
        }
    }
    const getAllPacks = () => {
        dispatch(setUserIdAC(""))
        dispatch(getCardsPacksTC())
    }

    return (
        <div className={s.filter}>
            <h4 className={s.filterTitle}>Show packs cards</h4>
            <div className={s.filterWrap}>
                <button className={s.btnMy} onClick={getMyPacks}>MY</button>
                <button className={s.btnAll} onClick={getAllPacks}>All</button>
            </div>
            <div className={s.content}>
                <span className={s.span}>Number of cards</span>
                <SuperDoubleRange/>
            </div>
            
        </div>
    )
}