import React, {useState} from 'react';
import s from './ProfileInfo.module.scss';
import DoubleRange from "../../../common/DoubleRange/DoubleRange";
import {LoginInitialStateType} from "../../../../bll/reducers/login-reducer";
import {logOutTC} from "../../../../bll/reducers/logOut-reducer";
import {useDispatch} from "react-redux";
import {EditProfile} from "./EditProfile";
import Button from "../../../common/Button/Button";

type PropsType = {
    auth: LoginInitialStateType
}

export const ProfileInfo: React.FC<PropsType> = ({auth}) => {

    const [editWinOpen, setEditWinOpen] = useState(false)

    const dispatch = useDispatch()

    const winIsOpened = () => {
        setEditWinOpen(true)
    }
    const closeCallback = () => {
        setEditWinOpen(false)
    }

    const logOut = () => {
        dispatch(logOutTC())
    }

    return (
        <div className={s.filter}>
            <div className={s.userInfo}>
                <img className={s.userImg} src={auth.dataUser?.avatar} alt="user img"/>
                <span className={s.userName}>User name</span>
                <span className={s.userProf}>Front-end developer</span>
                <div className={s.buttons}>
                    <Button className={s.btn} onClick={winIsOpened}>Edit profile</Button>
                    <Button className={s.btn} onClick={logOut}>Logout</Button>
                </div>
            </div>
            <div className={s.content}>
                <span className={s.filterSpan}>Number of cards</span>
                <DoubleRange/>
            </div>
            {editWinOpen && <EditProfile
                auth={auth}
                closeCallback={closeCallback}
            />}
        </div>
    )
}