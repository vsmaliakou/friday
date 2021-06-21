import React, {ChangeEvent} from 'react';
import s from './../packListPage/packList/PacksList.module.scss'
import {getNewCardsTC, setCurrentPageCards, setPageCountCards} from "../../../../bll/reducers/cards-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../bll/store";
import {LoadingSvg} from "../../../common/Loading/LoadingSvg";
import {RequestStatusType} from "../../../../bll/reducers/app-reduser";
import {CardsContainer} from "./CardsContainer";
import {NavLink} from "react-router-dom";
import Search from "../../../common/Search/Search";

export const CardsPage: React.FC = () => {

    //pagination
    const pageSize = useSelector<AppRootStateType, number>(state => state.cards.pageCount)
    const totalCardsCount = useSelector<AppRootStateType, number>(state => state.cards.totalCardsCount)
    const currentPage = useSelector<AppRootStateType, number>(state => state.cards.page)
    const idUserPack = useSelector<AppRootStateType, string>(state => state.cards.idUserCards)
    const loading = useSelector<AppRootStateType, RequestStatusType>(state => state.app.requestStatus)

    const dispatch = useDispatch()

    // const searchCallback = (title: string) => {
    //     dispatch(setSearchCards(title))
    //     dispatch(getNewCardsTC(idUserPack))
    // }

    //pagination
    const onPageChanged = (pageNumber: number) => {
        dispatch(setCurrentPageCards(pageNumber))
        dispatch(getNewCardsTC(idUserPack))
    }
    const setPageCount = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setPageCountCards(Number(e.currentTarget.value)))
        dispatch(getNewCardsTC(idUserPack))
    }

    return (
        <div className={s.main}>
            {loading === "loading" ? <LoadingSvg/> : null}
            <div className={s.content}>
                <NavLink to={'/packs'}>
                    <img src="arrow" alt=""/>
                    Pack Name
                </NavLink>
                <h2 className={s.packListTitle}>Cards</h2>
                {/*<Search searchCallback={searchCallback}/>*/}
                <CardsContainer/>
                {/*<Paginator*/}
                {/*    pageSize={pageSize}*/}
                {/*    totalItemCounts={totalCardsCount}*/}
                {/*    currentPage={currentPage}*/}
                {/*    onPageChanged={onPageChanged}*/}
                {/*    setPageCount={setPageCount}*/}
                {/*/>*/}
            </div>
        </div>
    )
}