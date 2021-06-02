import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import s from "../auth/login/_Login.module.scss";
import {logOutTC} from "../../../bll/reducers/logOut-reducer";
import {checkDataUserTC} from "../../../bll/reducers/profile-reducer";
import {ProfileInitialStateType} from "../../../bll/reducers/profile-reducer";

export const ProfileContainer = () => {
    const dispatch = useDispatch()
    const profileData = useSelector<AppRootStateType, ProfileInitialStateType>(state => state.profile)
    const logOutMessage = useSelector<AppRootStateType, null | string>(state => state.logOut.logOutInfo)

    useEffect(() => {
        dispatch(checkDataUserTC())
    }, [])

    const logOut = () => {
        dispatch(logOutTC())
    }

    return (
        <div>
            <p>name:{profileData.profileData?.name}</p>
            <p>token:{profileData.profileData?.token}</p>
            <p>cards:{profileData.profileData?.publicCardPacksCount}</p>
            <p>email:{profileData.profileData?.email}</p>
            <SuperButton className={s.loginBtn}
                         onClick={logOut}>Log out
            </SuperButton>
        </div>

        // <Profile/>
    )
}