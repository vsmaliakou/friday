import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import s from "../auth/login/_Login.module.scss";
import {logOutTC} from "../../../bll/reducers/logOut-reducer";
import {authTC, changeAvatarProfileTC, changeNameProfileTC,} from "../../../bll/reducers/profile-reducer";
import {LoginInitialStateType} from "../../../bll/reducers/login-reducer";
import {Redirect} from "react-router-dom";

export const ProfileContainer = () => {

    const dispatch = useDispatch()
    const auth = useSelector<AppRootStateType, LoginInitialStateType>(state => state.login)
    const checkAuth = useSelector<AppRootStateType, null | string>(state => state.profile.errorMessage)
    const logOutSuccess = useSelector<AppRootStateType, null | string>(state => state.logOut.logOutInfo)

    useEffect(() => {
        if (auth.dataUser === null) {
            dispatch(authTC())
        }
    }, [])

    if (logOutSuccess || checkAuth) {
        return <Redirect to={'/login'}/>
    }

    const logOut = () => {
        dispatch(logOutTC())
    }

    const changeAvatarHandler = () => {
        dispatch(changeNameProfileTC('Eugene'))
    }
    const changeNameHandler = () => {
        dispatch(changeAvatarProfileTC('https://memepedia.ru/wp-content/uploads/2018/07/150412976013508192-kopiya-768x576.jpg')) ///загрузка аватара
    }

    return (
        <div>
            avatar:<img src={auth.dataUser?.avatar}/>
            <button onClick={changeAvatarHandler}
            >change image
            </button>

            name:{auth.dataUser?.name}
            <button onClick={changeNameHandler}
            >change name
            </button>

            <p>token:{auth.dataUser?.token}</p>
            <p>email:{auth.dataUser?.email}</p>

            <SuperButton className={s.loginBtn}
                         onClick={logOut}>Log out
            </SuperButton>
        </div>

        // <Profile/>
    )
}