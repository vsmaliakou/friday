import React, {ChangeEvent, useEffect} from 'react';
import s from '../packsPage/PacksPage.module.scss'
import {
    getNewCardsTC,
    setCardsPackIdAC,
    setCurrentPageCardsAC,
    setPageCountCardsAC,
    setSearchCardsAC,
} from "../../../../bll/reducers/cards-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../bll/store";
import {CardsContainer} from "./CardsContainer";
import {NavLink, Redirect, useParams} from "react-router-dom";
import {Paginator} from "../../../common/Paginator/Paginator";
import {authTC} from "../../../../bll/reducers/profile-reducer";
import {LoginInitialStateType} from "../../../../bll/reducers/login-reducer";
import Search from '../../../common/Search/Search';

type PropsType = {
    auth: LoginInitialStateType
}

export const CardsPage: React.FC<PropsType> = ({auth}) => {

    const totalCardsCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTotalCount)
    const pageSize = useSelector<AppRootStateType, number>(state => state.cards.pageCount)
    const currentPage = useSelector<AppRootStateType, number>(state => state.cards.page)

    const dispatch = useDispatch()
    const {_id} = useParams<{ _id: string }>()

    useEffect(() => {
        if (!auth.auth) {
            dispatch(authTC())
        } else {
            dispatch(setCardsPackIdAC(_id))
            dispatch(getNewCardsTC())
        }
    }, [])

    let delayTimer: any
    const searchCallback = (title: string) => {
        clearTimeout(delayTimer)
        delayTimer = setTimeout(() => {
            dispatch(setSearchCardsAC(title))
            dispatch(getNewCardsTC())
        }, 2000)
    }

    const onPageChanged = (pageNumber: number) => {
        dispatch(setCurrentPageCardsAC(pageNumber))
        dispatch(getNewCardsTC())
    }
    const setPageCount = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setPageCountCardsAC(Number(e.currentTarget.value)))
        dispatch(getNewCardsTC())
    }

    if (!auth.auth) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div className={s.main}>
            <div className={s.content}>
                <NavLink to={'/packs'} className={s.packListTitle}><h2>Pack Name</h2></NavLink>
                <Search searchCallback={searchCallback}/>
                <CardsContainer
                    auth={auth}
                    cardsPack_id={_id}
                />
                <Paginator
                    pageSize={pageSize}
                    totalItemCounts={totalCardsCount}
                    currentPage={currentPage}
                    onPageChanged={onPageChanged}
                    setPageCount={setPageCount}
                />
            </div>
        </div>
    )
}