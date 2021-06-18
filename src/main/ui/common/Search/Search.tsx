import React, {ChangeEvent} from "react";
import {getCardsPacksTC, setSearchAC} from "../../../bll/reducers/cardsPacks-reducer";
import {useDispatch} from 'react-redux'
import s from './Search.module.scss'

const Search = () => {

    const dispatch = useDispatch()

    const search = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchAC(e.currentTarget.value))
        dispatch(getCardsPacksTC())
    }

    return (
        <div className={s.wrap}>
            <input type={'text'}
                   placeholder='Search...'
                   onChange={search}
                   className={s.input}
            />
        </div>
    )
}
export default Search

