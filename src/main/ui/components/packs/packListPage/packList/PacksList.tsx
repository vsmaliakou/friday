import React, {ChangeEvent} from 'react';
import s from './PacksList.module.scss'
import {Filter} from "./filter/Filter";
import {CardsPacksContainer} from "./cardsPacks/CardsPacksContainer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../../bll/store";
import {getCardsPacksTC, setCurrentPageAC, setPageCountAC} from "../../../../../bll/reducers/cardsPacks-reducer";
import {Paginator} from "../../../../common/Paginator/Paginator";
import {LoginInitialStateType} from "../../../../../bll/reducers/login-reducer";
import Search from "../../../../common/Search/Search";

type PacksListPropsType = {
    auth: LoginInitialStateType
}

export const PacksList: React.FC<PacksListPropsType> = ({auth}) => {

    const pageSize = useSelector<AppRootStateType, number>(state => state.packs.pageCount)
    const totalPacksCount = useSelector<AppRootStateType, number>(state => state.packs.totalPacksCount)
    const currentPage = useSelector<AppRootStateType, number>(state => state.packs.page)

    const dispatch = useDispatch()

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
            <Filter auth={auth}/>
            <div className={s.content}>
                <h2 className={s.packListTitle}>Packs list</h2>
                <Search/>
                <CardsPacksContainer auth={auth}/>
                <Paginator
                    pageSize={pageSize}
                    totalItemCounts={totalPacksCount}
                    currentPage={currentPage}
                    onPageChanged={onPageChanged}
                    setPageCount={setPageCount}/>
            </div>
        </div>
    )
}