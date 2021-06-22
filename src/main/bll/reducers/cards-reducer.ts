import {cardsAPI, CardType, newGradeCardType, newValueCardType} from "../../dal/packs/cardsAPI";
import {setErrorProfilePage} from "./profile-reducer";
import {NewCardType} from "../../ui/components/packs/cards/AddNewCard/AddNewCardContainer";
import {setRequestStatusAC} from "./app-reduser";
import {disableButtonAC} from "./login-reducer";
import {AppActionsType, AppRootStateType} from "../store";
import {ThunkDispatch} from "redux-thunk";

export type CardsInitialStateType = typeof initialState

let initialState = {
    cards: [] as Array<CardType>,
    buttonDisable: false,
    actualIdCard: '',
    idUserCards: '',
    page: 1,
    pageCount: 7,
    min: 1,
    max: 4,
    totalCardsCount: 5,
    sortCards: ''
}

const cardsReducer = (state = initialState, action: CardsActionType): CardsInitialStateType => {
    switch (action.type) {
        case cardsActionsTypes["SET-CARDS"]:
            return {
                ...state,
                cards: action.cards
            }
        case cardsActionsTypes["SET-NEW-CARD"]:
            return {
                ...state,
                cards: [action.newCard, ...state.cards]
            }
        case cardsActionsTypes["DELETE-CARD"]:
            return {...state, cards: [...state.cards.filter(id => id._id !== action.idCard)]}
        case cardsActionsTypes.DISABLE:
            return {...state, buttonDisable: action.disable}
        case cardsActionsTypes["SET-ID-ACTUAL-CARD"]:
            return {
                ...state, actualIdCard: action.id
            }
        case cardsActionsTypes['SET-NEW-VALUE-CARD']:
            const card = state.cards.find(id => id._id === action.newValueCard._id)
            if (card) {
                card.question = action.newValueCard.question
                card.answer = action.newValueCard.comments
            }
            return {...state}
        case cardsActionsTypes['SET-ID-USER-CARDS']:
            return {
                ...state, idUserCards: action.id
            }
        case cardsActionsTypes['SET-PAGE-COUNT-CARDS']:
            return {...state, pageCount: action.newPageCount}
        case cardsActionsTypes["SET-CURRENT-PAGE-CARDS"]:
            return {...state, page: action.pageNumber}
        case cardsActionsTypes["SET-TOTAL-CARDS-COUNT"]:
            return {...state, totalCardsCount: action.totalCardsCount}
        default:
            return state
    }
}

//AC
export const getCards = (cards: Array<CardType>) => ({type: cardsActionsTypes["SET-CARDS"], cards} as const)
export const setNewCard = (newCard: CardType) => ({type: cardsActionsTypes["SET-NEW-CARD"], newCard} as const)
export const deleteCard = (idCard: string) => ({type: cardsActionsTypes["DELETE-CARD"], idCard} as const)
export const disableButton = (disable: boolean) => ({type: cardsActionsTypes["DISABLE"], disable} as const)
export const setIdActualCard = (id: string) => ({type: cardsActionsTypes["SET-ID-ACTUAL-CARD"], id} as const)
export const setNewValueCard = (newValueCard: CardType) => ({
    type: cardsActionsTypes["SET-NEW-VALUE-CARD"],
    newValueCard
} as const)
export const setIdUserCards = (id: string) => ({type: cardsActionsTypes["SET-ID-USER-CARDS"], id} as const)

//pagination
export const setPageCountCards = (newPageCount: number) => ({
    type: cardsActionsTypes["SET-PAGE-COUNT-CARDS"],
    newPageCount
} as const)
export const setCurrentPageCards = (pageNumber: number) => ({
    type: cardsActionsTypes["SET-CURRENT-PAGE-CARDS"], pageNumber
} as const)
export const setTotalCardsCount = (totalCardsCount: number) => ({
    type: cardsActionsTypes["SET-TOTAL-CARDS-COUNT"],
    totalCardsCount
} as const)

export type CardsActionType = ReturnType<typeof getCards>
    | ReturnType<typeof setNewCard>
    | ReturnType<typeof deleteCard>
    | ReturnType<typeof disableButton>
    | ReturnType<typeof setIdActualCard>
    | ReturnType<typeof setNewValueCard>
    | ReturnType<typeof setIdUserCards>
    | ReturnType<typeof setPageCountCards>
    | ReturnType<typeof setCurrentPageCards>
    | ReturnType<typeof setTotalCardsCount>

export enum cardsActionsTypes {
    'SET-CARDS' = 'CARDS/CARDS/SET-CARDS',
    'SET-NEW-CARD' = 'CARDS/CARDS/SET-NEW-CARD',
    'DELETE-CARD' = 'CARDS/CARDS/DELETE-CARD',
    'DISABLE' = 'CARDS/CARDS/BUTTON',
    'SET-ID-ACTUAL-CARD' = 'CARDS/CARDS/SET-ID-ACTUAL-CARD',
    "SET-NEW-VALUE-CARD" = 'CARDS/CARDS/SET-NEW-VALUE-CARD',
    "SET-ID-USER-CARDS" = 'CARDS/CARDS/SET-ID-USER-CARDS',
    "SET-PAGE-COUNT-CARDS" = 'CARDS/CARDS/SET-PAGE-COUNT-CARDS',
    "SET-CURRENT-PAGE-CARDS" = 'CARDS/CARDS/SET-CURRENT-PAGE-CARDS',
    "SET-TOTAL-CARDS-COUNT" = 'CARDS/CARDS/SET-TOTAL-CARDS-COUNT'
}

//TC
export const getNewCardsTC = (id: string) => {
    return (dispatch: ThunkDispatch<AppRootStateType, unknown, AppActionsType>, getState: () => AppRootStateType) => {

        // const payload = {
        //     min: getState().cards.min,
        //     max: getState().cards.max,
        //     sortCards: getState().cards.sortCards,
        //     page: getState().cards.page,
        //     pageCount: getState().cards.pageCount,
        // }

        dispatch(setRequestStatusAC('loading'))
        dispatch(disableButton(true))
        dispatch(setIdActualCard(id))
        cardsAPI.getCards(id /*payload.min, payload.max, payload.sortCards, payload.page, payload.pageCount*/)
            .then(res => {
                dispatch(setTotalCardsCount(res.data.cardsTotalCount))
                dispatch(setIdUserCards(res.data.packUserId))
                dispatch(getCards(res.data.cards))
                dispatch(disableButton(false))
            })
            .catch((e) => {
                dispatch(setErrorProfilePage(e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console')
                ))
                dispatch(disableButtonAC(false))
            })
            .finally(() => {
                    dispatch(setRequestStatusAC('success'))
                }
            )
    }
}

export const createNewCardTC = (card: NewCardType) => {
    return (dispatch: ThunkDispatch<AppRootStateType, unknown, AppActionsType>, getState: () => AppRootStateType) => {
        const actualIdCard = getState().cards.actualIdCard
        cardsAPI.createCard(card)
            .then(res => {
                dispatch(setNewCard(res.data))
                dispatch(getNewCardsTC(actualIdCard))
            })
            .catch((e) => {
                dispatch(setErrorProfilePage(e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console')
                ))
            })
    }
}

export const deleteCardTC = (idCard: string) => {
    return (dispatch: ThunkDispatch<AppRootStateType, unknown, AppActionsType>, getState: () => AppRootStateType) => {
        const actualIdCard = getState().cards.actualIdCard
        cardsAPI.deleteCard(idCard)
            .then(res => {
                dispatch(deleteCard(res.data._id))
                dispatch(getNewCardsTC(actualIdCard))
            })
            .catch((e) => {
                dispatch(setErrorProfilePage(e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console')
                ))
            })
    }
}

export const getNewValueForCard = (card: newValueCardType) => {
    return (dispatch: ThunkDispatch<AppRootStateType, unknown, AppActionsType>, getState: () => AppRootStateType) => {
        const actualIdCard = getState().cards.actualIdCard
        dispatch(setRequestStatusAC('loading'))
        dispatch(disableButton(true))
        cardsAPI.changeValueCard(card)
            .then(res => {
                dispatch(setNewValueCard(res.data))
                dispatch(disableButton(false))
                dispatch(getNewCardsTC(actualIdCard))
            })
            .catch((e) => {
                dispatch(setErrorProfilePage(e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console')
                ))
                dispatch(disableButtonAC(false))
            })
            .finally(() => {
                    dispatch(setRequestStatusAC('success'))
                }
            )
    }
}

export const changeGradeCard = (card_id: string, grade: null | number) => {
    return (dispatch: ThunkDispatch<AppRootStateType, unknown, AppActionsType>, getState: () => AppRootStateType) => {
        cardsAPI.changeGradeCard(card_id, grade)
            .then(res => {
            })
            .catch((e) => {
                dispatch(setErrorProfilePage(e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console')
                ))
            })
            .finally(() => {
                    dispatch(setRequestStatusAC('success'))
                }
            )
    }
}

export default cardsReducer
