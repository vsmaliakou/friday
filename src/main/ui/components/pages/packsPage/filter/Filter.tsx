import React, {useState} from 'react';
import s from './Filter.module.scss';
import {getCardsPacksTC, setUserIdAC} from "../../../../../bll/reducers/cardsPacks-reducer";
import {useDispatch} from "react-redux";
import {LoginInitialStateType} from "../../../../../bll/reducers/login-reducer";
import DoubleRange from "../../../../common/DoubleRange/DoubleRange";
import Button from "../../../../common/Button/Button";

type FilterPropsType = {
    auth: LoginInitialStateType
}

export const Filter: React.FC<FilterPropsType> = ({auth}) => {

    const [activeMy, setActiveMy] = useState(false)
    const [activeAll, setActiveAll] = useState(true)

    const dispatch = useDispatch()

    const getMyPacks = () => {
        setActiveMy(true)
        setActiveAll(false)
        if (auth.dataUser?._id) {
            dispatch(setUserIdAC(auth.dataUser._id))
            dispatch(getCardsPacksTC())
        }
    }
    const getAllPacks = () => {
        setActiveAll(true)
        setActiveMy(false)
        dispatch(setUserIdAC(""))
        dispatch(getCardsPacksTC())
    }

    return (
        <div className={s.filter}>
            <h4 className={s.filterTitle}>Show packs cards</h4>
            <div className={s.filterWrap}>
                <Button className={activeMy ? `${s.btnMy} ${s.btnActive}` : s.btnMy} onClick={getMyPacks}>MY</Button>
                <Button className={activeAll ? `${s.btnAll} ${s.btnActive}` : s.btnAll} onClick={getAllPacks}>ALL</Button>
            </div>
            <div className={s.content}>
                <span className={s.span}>Number of cards</span>
                <DoubleRange/>
            </div>
            
        </div>
    )
}