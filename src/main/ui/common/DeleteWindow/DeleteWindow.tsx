import React from 'react';
import s from './DeleteWindow.module.scss';

type PropsType = {
    title: string
    name: string
    closeCallback: () => void
    removeCallback: () => void
}

export const DeleteWindow: React.FC<PropsType> = (props) => {
    return (
        <div className={s.wrap}>
            <div className={s.card}>
                <div className={s.titleWrap}>
                    <h2 className={s.title}>{props.title}</h2>
                </div>
                <span className={s.text}>
                    Do you really want to remove this {props.name}?
                </span>
                <div className={s.btnWrap}>
                    <button className={s.btn} onClick={() => props.closeCallback()}>Cancel</button>
                    <button className={s.btn} onClick={() => props.removeCallback()}>Delete</button>
                </div>
            </div>
        </div>
    )
}