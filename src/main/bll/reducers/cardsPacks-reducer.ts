import {Dispatch} from "redux";
import {cardsPacksAPI, CardsPacksType, NewCardsPackType} from "../../dal/packs/cardsPacksAPI";
import {ThunkDispatch} from "redux-thunk";
import {AppActionsType, AppRootStateType} from "../store";

export type PacksActionType = ReturnType<typeof getCardsPacksAC>
    | ReturnType<typeof updateCardsPackAC>
    | ReturnType<typeof setTotalPacksCountAC>
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setUserIdAC>
    | ReturnType<typeof setSearchAC>
    | ReturnType<typeof setMinMaxValueAC>
export type PacksInitialStateType = typeof initialState

let initialState = {
    cardsPacks: [] as Array<CardsPacksType>,
    packName: "",
    min: 0,
    max: 9,
    sortPacks: "",
    page: 1,
    pageCount: 5,
    user_id: "",
    totalPacksCount: 5
}

const cardsPacksReducer = (state = initialState, action: PacksActionType): PacksInitialStateType => {
    switch (action.type) {
        case 'CARDS/PACKS/GET-CARDS-PACKS':
            return {...state, cardsPacks: action.cardsPacks}
        case 'CARDS/PACKS/UPDATE-CARDS-PACK':
            return {
                ...state,
                cardsPacks: state.cardsPacks.map(p => p._id === action.cardsPackId ? {
                    ...p,
                    user_name: action.newName
                } : p)
            }
        case 'CARDS/PACKS/SET-TOTAL-PACKS-COUNT':
            return {...state, totalPacksCount: action.totalPacksCount}
        case 'CARDS/PACKS/SET-PAGE-COUNT':
            return {...state, pageCount: action.newPageCount}
        case 'CARDS/PACKS/SET-CURRENT-PAGE':
            return {...state, page: action.pageNumber}
        case 'CARDS/PACKS/SET-USER-ID':
            return {...state, user_id: action.userId}
        case 'CARDS/PACKS/SET-SEARCH':
            return {...state, packName: action.title}
        case 'CARDS/PACKS/SET-MIN-MAX-VALUE':
            return {...state, min: action.newMin, max: action.newMax}
        default:
            return state
    }
}

export const getCardsPacksAC = (cardsPacks: Array<CardsPacksType>) => ({type: 'CARDS/PACKS/GET-CARDS-PACKS', cardsPacks} as const)
export const updateCardsPackAC = (cardsPackId: string, newName: string) => ({type: 'CARDS/PACKS/UPDATE-CARDS-PACK', cardsPackId, newName} as const)
export const setTotalPacksCountAC = (totalPacksCount: number) => ({type: 'CARDS/PACKS/SET-TOTAL-PACKS-COUNT', totalPacksCount} as const)
export const setPageCountAC = (newPageCount: number) => ({type: 'CARDS/PACKS/SET-PAGE-COUNT', newPageCount} as const)
export const setCurrentPageAC = (pageNumber: number) => ({type: 'CARDS/PACKS/SET-CURRENT-PAGE', pageNumber} as const)
export const setUserIdAC = (userId: string) => ({type: 'CARDS/PACKS/SET-USER-ID', userId} as const)
export const setSearchAC = (title: string) => ({type: 'CARDS/PACKS/SET-SEARCH', title} as const)
export const setMinMaxValueAC = ([newMin, newMax]: number[]) => ({type: 'CARDS/PACKS/SET-MIN-MAX-VALUE', newMin, newMax} as const)

export const getCardsPacksTC = () => (dispatch: Dispatch, getState: () => AppRootStateType) => {

    const state = getState()
    const packName = state.packs.packName
    const min = state.packs.min
    const max = state.packs.max
    const sortPacks = state.packs.sortPacks
    const page = state.packs.page
    const pageCount = state.packs.pageCount
    const user_id = state.packs.user_id

    return cardsPacksAPI.getCardsPacks(packName, min, max, sortPacks, page, pageCount, user_id)
        .then(response => {
            dispatch(setTotalPacksCountAC(response.data.cardPacksTotalCount))
            dispatch(getCardsPacksAC(response.data.cardPacks))
        })
        .catch(e => {
            console.log(e.response.data.error)
        })
}
export const addNewCardsPackTC = (cardsPack: NewCardsPackType) => (dispatch: ThunkDispatch<AppRootStateType, null, AppActionsType>) => {
    return cardsPacksAPI.addNewCardsPack(cardsPack)
        .then(response => {
            dispatch(getCardsPacksTC())
        })
        .catch(e => {
            console.log(e.response.data.error)
        })
}
export const removeCardsPackTC = (cardsPackId: string) => (dispatch: ThunkDispatch<AppRootStateType, null, AppActionsType>) => {
    return cardsPacksAPI.removeCardsPack(cardsPackId)
        .then(response => {
            dispatch(getCardsPacksTC())
        })
        .catch(e => {
            console.log(e.response.data.error)
        })
}
export const updateCardsPackTC = (_id: string, name: string) => (dispatch: ThunkDispatch<AppRootStateType, null, AppActionsType>) => {
    return cardsPacksAPI.updatePack({_id, name})
        .then(response => {
            dispatch(getCardsPacksTC())
        })
        .catch(e => {
            console.log(e.response.data.error)
        })
}

export default cardsPacksReducer
