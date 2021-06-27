import React, {ChangeEvent, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../bll/store";
import s from '../packsPage/PacksPage.module.scss';
import {LoginInitialStateType} from "../../../../bll/reducers/login-reducer";
import {useParams} from "react-router-dom";
import {ProfileInfo} from "./ProfileInfo";
import Search from "../../../common/Search/Search";
import {Table} from "../../../common/Table/Table";
import {Paginator} from "../../../common/Paginator/Paginator";
import {
    getCardsPacksTC,
    setCurrentPageAC,
    setPageCountAC,
    setSearchAC,
    setUserIdAC
} from "../../../../bll/reducers/cardsPacks-reducer";

type PropsType = {
    auth: LoginInitialStateType
}

export const ProfilePage: React.FC<PropsType> = ({auth}) => {

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

    let delayTimer: any
    const searchCallback = (title: string) => {
        clearTimeout(delayTimer)
        delayTimer = setTimeout(() => {
            dispatch(setSearchAC(title))
            dispatch(getCardsPacksTC())
        }, 2000)
    }

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
                <h2 className={s.packListTitle}>Packs list</h2>
                <Search searchCallback={searchCallback}/>
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