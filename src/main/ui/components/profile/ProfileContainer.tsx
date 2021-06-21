import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";
import SuperButton from "../../common/SuperButton/SuperButton";
import s from './Profile.module.scss';
import {logOutTC} from "../../../bll/reducers/logOut-reducer";
import {changeAvatarProfileTC, changeNameProfileTC,} from "../../../bll/reducers/profile-reducer";
import {LoginInitialStateType} from "../../../bll/reducers/login-reducer";
import {useParams} from "react-router-dom";
import {LoadingSvg} from "../../common/Loading/LoadingSvg";
import {RequestStatusType} from "../../../bll/reducers/app-reduser";
import {ProfileInfo} from "./ProfileInfo";
import Search from "../../common/Search/Search";
import {Table} from "../../common/Table/Table";
import {Paginator} from "../../common/Paginator/Paginator";
import {getCardsPacksTC, setCurrentPageAC, setPageCountAC, setUserIdAC} from "../../../bll/reducers/cardsPacks-reducer";

export const ProfileContainer = () => {

    const auth = useSelector<AppRootStateType, LoginInitialStateType>(state => state.login)
    const pageSize = useSelector<AppRootStateType, number>(state => state.packs.pageCount)
    const totalPacksCount = useSelector<AppRootStateType, number>(state => state.packs.totalPacksCount)
    const currentPage = useSelector<AppRootStateType, number>(state => state.packs.page)

    const dispatch = useDispatch()
    const {user_id} = useParams<{ user_id: string }>()

    useEffect(() => {
        if(user_id){
            dispatch(setUserIdAC(user_id))
            dispatch(getCardsPacksTC())
        } else if (auth.dataUser){
            dispatch(setUserIdAC(auth.dataUser?._id))
            dispatch(getCardsPacksTC())
        }
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(setCurrentPageAC(pageNumber))
        dispatch(getCardsPacksTC())
    }
    const setPageCount = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setPageCountAC(Number(e.currentTarget.value)))
        dispatch(getCardsPacksTC())
    }

    return (
        <div className={s.main}>
            <ProfileInfo auth={auth}/>
            <div className={s.content}>
                <h2 className={s.packListTitle}>Packs list {auth.dataUser?.name}</h2>
                <Search/>
                <Table auth={auth}/>
                <Paginator
                    pageSize={pageSize}
                    totalItemCounts={totalPacksCount}
                    currentPage={currentPage}
                    onPageChanged={onPageChanged}
                    setPageCount={setPageCount}
                />
            </div>
        </div>
    )
}

export const EditProfile = () => {

    const dispatch = useDispatch()

    const auth = useSelector<AppRootStateType, LoginInitialStateType>(state => state.login)



    const loading = useSelector<AppRootStateType, RequestStatusType>(state => state.app.requestStatus)
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState('')


    //logout
    const logOut = () => {
        dispatch(logOutTC())
    }

    //change avatar
    const changeAvatarHandler = () => {
        dispatch(changeAvatarProfileTC('https://memepedia.ru/wp-content/uploads/2018/07/150412976013508192-kopiya-768x576.jpg')) ///загрузка аватара
    }

    //switch edit mode, focus input
    const changeNameInputFocus = () => {
        setEditMode(false)
        dispatch(changeNameProfileTC(name))
    }
    const switchEditMode = () => {
        setEditMode(true)
    }

    //change name
    const setNewName = (newName: string) => {
        setName(newName)
    }
    const onChangeNewNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    }
    return (
        <div>
            {loading === "loading" ? <LoadingSvg/> : null}

            avatar:<img src={auth.dataUser?.avatar}/>
            <button onClick={changeAvatarHandler}>change image</button>

            {editMode

                ? <input autoFocus onBlur={changeNameInputFocus}
                         onChange={onChangeNewNameHandler}
                />

                : <span onDoubleClick={switchEditMode}> name: {auth.dataUser?.name}</span>
            }

            <p>token:{auth.dataUser?.token}</p>
            <p>email:{auth.dataUser?.email}</p>

            <SuperButton className={s.loginBtn}
                         onClick={logOut}>Log out
            </SuperButton>

        </div>
    )
}