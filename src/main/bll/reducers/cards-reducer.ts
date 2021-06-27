import {cardsAPI, CardType, newValueCardType} from "../../dal/packs/cardsAPI";
import {setErrorProfilePage} from "./profile-reducer";
import {setRequestStatusAC} from "./app-reduser";
import {AppActionsType, AppRootStateType} from "../store";
import {ThunkDispatch} from "redux-thunk";
import {Dispatch} from "redux";

export type CardsActionType = ReturnType<typeof setCardsPackIdAC>
    | ReturnType<typeof getCardsAC>
    | ReturnType<typeof setTotalCardsCountAC>
    | ReturnType<typeof setPackUserIdAC>
    | ReturnType<typeof setCurrentPageCardsAC>
    | ReturnType<typeof setPageCountCardsAC>
    | ReturnType<typeof setSearchCardsAC>
export type CardsInitialStateType = typeof initialState

type NewCardType = {
    cardsPack_id: string
    question: string
    answer: string
}

let initialState = {
    cards: [] as Array<CardType>,
    cardAnswer: '',
    cardQuestion: '',
    cardsPack_id: '',
    min: 0,
    max: 5,
    sortCards: '',
    page: 1,
    pageCount: 5,
    cardsTotalCount: 5,
    packUserId: ''
}

const cardsReducer = (state = initialState, action: CardsActionType): CardsInitialStateType => {
    switch (action.type) {
        case 'CARDS/CARDS/SET-CARDS-PACK-ID':
            return {...state, cardsPack_id: action.id}
        case 'CARDS/CARDS/SET-CARDS':
            return {...state, cards: action.cards}
        case "CARDS/CARDS/SET-TOTAL-CARDS-COUNT":
            return {...state, cardsTotalCount: action.cardsTotalCount}
        case "CARDS/CARDS/SET-PACK-USER-ID":
            return {...state, packUserId: action.packUserId}
        case "CARDS/CARDS/SET-CURRENT-PAGE-CARDS":
            return {...state, page: action.pageNumber}
        case "CARDS/CARDS/SET-PAGE-COUNT-CARDS":
            return {...state, pageCount: action.newPageCount}
        case "CARDS/CARDS/SET-SEARCH":
            return {...state, sortCards: action.title}
        default:
            return state
    }
}

export const setCardsPackIdAC = (id: string) => ({type: 'CARDS/CARDS/SET-CARDS-PACK-ID', id} as const)
export const getCardsAC = (cards: Array<CardType>) => ({type: 'CARDS/CARDS/SET-CARDS', cards} as const)
export const setTotalCardsCountAC = (cardsTotalCount: number) => ({
    type: 'CARDS/CARDS/SET-TOTAL-CARDS-COUNT',
    cardsTotalCount
} as const)
export const setPackUserIdAC = (packUserId: string) => ({type: 'CARDS/CARDS/SET-PACK-USER-ID', packUserId} as const)
export const setCurrentPageCardsAC = (pageNumber: number) => ({type: 'CARDS/CARDS/SET-CURRENT-PAGE-CARDS', pageNumber} as const)
export const setPageCountCardsAC = (newPageCount: number) => ({type: 'CARDS/CARDS/SET-PAGE-COUNT-CARDS', newPageCount} as const)
export const setSearchCardsAC = (title: string) => ({type: 'CARDS/CARDS/SET-SEARCH', title} as const)

export const getNewCardsTC = () => (dispatch: Dispatch, getState: () => AppRootStateType) => {

    const state = getState()
    const cardAnswer = state.cards.cardAnswer
    const cardQuestion = state.cards.cardQuestion
    const cardsPack_id = state.cards.cardsPack_id
    const min = state.cards.min
    const max = state.cards.max
    const sortCards = state.cards.sortCards
    const page = state.cards.page
    const pageCount = state.cards.pageCount

    dispatch(setRequestStatusAC('loading'))
    cardsAPI.getCards(cardAnswer, cardQuestion, cardsPack_id, min, max, sortCards, page, pageCount)
        .then(res => {
            dispatch(getCardsAC(res.data.cards))
            dispatch(setTotalCardsCountAC(res.data.cardsTotalCount))
            dispatch(setPackUserIdAC(res.data.packUserId))
            dispatch(setRequestStatusAC('success'))
        })
        .catch((e) => {
            dispatch(setErrorProfilePage(e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            ))
            dispatch(setRequestStatusAC('success'))
        })
}
export const createNewCardTC = (card: NewCardType) => (dispatch: ThunkDispatch<AppRootStateType, null, AppActionsType>) => {
    cardsAPI.createCard(card)
        .then(res => {
            dispatch(getNewCardsTC())
        })
        .catch((e) => {
            dispatch(setErrorProfilePage(e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            ))
        })
}
export const deleteCardTC = (idCard: string) => (dispatch: ThunkDispatch<AppRootStateType, null, AppActionsType>) => {
    cardsAPI.deleteCard(idCard)
        .then(res => {
            dispatch(getNewCardsTC())
        })
        .catch((e) => {
            dispatch(setErrorProfilePage(e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            ))
        })
}
export const getNewValueForCardTC = (card: newValueCardType) => (dispatch: ThunkDispatch<AppRootStateType, null, AppActionsType>) => {
    cardsAPI.changeValueCard(card)
        .then(res => {
            dispatch(getNewCardsTC())
        })
        .catch((e) => {
            dispatch(setErrorProfilePage(e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            ))
        })
}
export const changeGradeCardTC = (card_id: string, grade: null | number) => (dispatch: Dispatch) => {
    dispatch(setRequestStatusAC('loading'))
    cardsAPI.changeGradeCard(card_id, grade)
        .then(res => {
            dispatch(setRequestStatusAC('success'))
        })
        .catch((e) => {
            dispatch(setErrorProfilePage(e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            ))
            dispatch(setRequestStatusAC('success'))
        })
}

export default cardsReducer
