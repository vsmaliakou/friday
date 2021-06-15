import React, {ChangeEvent} from 'react';
import s from './_addNewPack.module.scss';

type PropsType = {
    newTitleCallback: (e: ChangeEvent<HTMLInputElement>) => void
    addCallback: () => void
    closeCallback: () => void
}

export const AddNewPack: React.FC<PropsType> = ({addCallback, closeCallback, newTitleCallback}) => {

    return (
        <div className={s.wrap}>

           <div className={s.card}>

                <div className={s.titleWrap}>
                    <h2 className={s.title}>Add new pack</h2>
                </div>
               

                <div className={s.inputWrap}>
                    <label className={s.label}>Name pack</label>
                    <input className={s.input} type="text" onChange={newTitleCallback}/>

                </div>

                <div className={s.btnWrap}>

                    <button className={s.btn} onClick={closeCallback}>Cancel</button>
                    <button className={s.btn} onClick={addCallback}>Save</button>

                </div>

           </div>
            

        </div>
    )
}