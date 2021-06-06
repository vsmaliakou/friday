import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import s from "../auth/login/_Login.module.scss";
import {logOutTC} from "../../../bll/reducers/logOut-reducer";
import {checkDataUserTC} from "../../../bll/reducers/profile-reducer";
import {LoginInitialStateType} from "../../../bll/reducers/login-reducer";
import {Redirect} from "react-router-dom";

export const ProfileContainer = () => {

    const dispatch = useDispatch()
    const auth = useSelector<AppRootStateType, LoginInitialStateType>(state => state.login)
    const checkAuth = useSelector<AppRootStateType, null | string>(state => state.profile.errorMessage)

    useEffect(() => {
        if (auth.dataUser === null) {
            dispatch(checkDataUserTC())
        }
    }, [])

    if (checkAuth) {
        return <Redirect to={'/login'}/>
    }

    const logOut = () => {
        dispatch(logOutTC())
    }

    return (
        <div>
            <p>name:{auth.dataUser?.name}</p>
            <p>token:{auth.dataUser?.token}</p>
            <p>avatar:{auth.dataUser?.avatar}</p>
            <p>email:{auth.dataUser?.email}</p>
            <SuperButton className={s.loginBtn}
                         onClick={logOut}>Log out
            </SuperButton>
        </div>

        // <Profile/>
    )
}