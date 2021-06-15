import React, {ChangeEvent} from 'react';
import s from './AddWindow.module.scss';

type PropsType = {
    title: string
    placeholder: string
    newTitleCallback: (e: ChangeEvent<HTMLInputElement>) => void
    answerCallback?: (e: ChangeEvent<HTMLInputElement>) => void
    closeCallback: () => void
    addCallback: () => void
}

export const AddWindow: React.FC<PropsType> = ({title, placeholder, newTitleCallback, answerCallback, closeCallback, addCallback}) => {
    return (
        <div className={s.wrap}>
           <div className={s.card}>
                <div className={s.titleWrap}>
                    <h2 className={s.title}>{title}</h2>
                </div>
                <div className={s.inputWrap}>
                    <label className={s.label}>{placeholder}</label>
                    <input className={s.input} type="text" onChange={newTitleCallback} />
                </div>
               {answerCallback && <div className={s.inputWrap}>
                   <label className={s.label}>Answer</label>
                   <input className={s.input} type="text" onChange={answerCallback}/>
               </div>}
                <div className={s.btnWrap}>
                    <button className={s.btn} onClick={closeCallback}>Cancel</button>
                    <button className={s.btn} onClick={addCallback}>Save</button>
                </div>
           </div>
        </div>
    )
}