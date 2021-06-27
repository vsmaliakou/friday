import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.scss';
import {useDispatch} from "react-redux";
import {LoginInitialStateType} from "../../../../bll/reducers/login-reducer";
import {changeAvatarProfileTC} from "../../../../bll/reducers/profile-reducer";
import Button from "../../../common/Button/Button";

type PropsType = {
    auth: LoginInitialStateType
    closeCallback: () => void
}

export const EditProfile: React.FC<PropsType> = ({auth, closeCallback}) => {

    const [newName, setNewName] = useState('')
    const [newEmail, setNewEmail] = useState('')

    const dispatch = useDispatch()

    const changeAvatarHandler = () => {
        dispatch(changeAvatarProfileTC('https://memepedia.ru/wp-content/uploads/2018/07/150412976013508192-kopiya-768x576.jpg'))
    }
    const onChangeNewName = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    }
    const onChangeNewEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setNewEmail(e.currentTarget.value)
    }

    return (
        <div className={s.wrap}>
            <div className={s.card}>
                <div className={s.titleWrap}>
                    <h2 className={s.title}>Personal Information</h2>
                </div>
                <div className={s.imgWrap}>
                    <img className={s.profile} src={auth.dataUser?.avatar} alt={"avatar"}/>
                    <Button className={s.imgLink} onClick={changeAvatarHandler}/>
                </div>
                <div className={s.inputWrap}>
                    <label className={s.label}>Nickname</label>
                    <input className={s.input} type="text" onChange={onChangeNewName}/>
                </div>
                <div className={s.inputWrap}>
                    <label className={s.label}>Email</label>
                    <input className={s.input} type="text" onChange={onChangeNewEmail}/>
                </div>
                <div className={s.btnWrap}>
                    <Button className={s.btn} onClick={closeCallback}>Cancel</Button>
                    <Button className={s.btn} onClick={closeCallback}>Save</Button>
                </div>
            </div>
        </div>
    )
}