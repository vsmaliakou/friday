import React from 'react';
import s from '../packList/_packListFilterProfile.module.scss';
import SuperDoubleRange from "../../common/SuperDoubleRange/SuperDoubleRange";
import {LoginInitialStateType} from "../../../bll/reducers/login-reducer";
import {logOutTC} from "../../../bll/reducers/logOut-reducer";
import {useDispatch} from "react-redux";

type PropsType = {
    auth: LoginInitialStateType
}

export const ProfileInfo: React.FC<PropsType> = ({auth}) => {

    const dispatch = useDispatch()

    const logOut = () => {
        dispatch(logOutTC())
    }

    return (
        <div className={s.filter}>
            <div className={s.userInfo}>
                <img className={s.userImg} src={auth.dataUser?.avatar} alt="user img"/>
                <span className={s.userName}>{auth.dataUser?.name}</span>
                <span className={s.userProf}>Front-end developer</span>
                <button className={s.btn}>Edit profile</button>
                <button className={s.btn} onClick={logOut}>Logout</button>
            </div>
            <div className={s.content}>
                <span className={s.filterSpan}>Number of cards</span>
                <SuperDoubleRange/>
            </div>
        </div>
    )
}