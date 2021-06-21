import React, {ChangeEvent} from "react";
import s from './Search.module.scss'

type PropsType = {
    searchCallback: (title: string) => void
}

const Search: React.FC<PropsType> = ({searchCallback}) => {

    const search = (e: ChangeEvent<HTMLInputElement>) => {
        searchCallback(e.currentTarget.value)
    }

    return (
        <div className={s.wrap}>
            <input type={'text'}
                   onChange={search}
                   className={s.input}
                   id="1"
            />
            <label className={s.label} htmlFor="1">Search . . .</label>
        </div>
    )
}
export default Search

