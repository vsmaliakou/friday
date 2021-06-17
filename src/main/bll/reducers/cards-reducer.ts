import {Dispatch} from "redux";
import {cardsAPI, CardType} from "../../dal/packs/cardsAPI";
import {setErrorProfilePage} from "./profile-reducer";
import {NewCardType} from "../../ui/components/packs/cards/AddNewCard/AddNewCardContainer";
import {setRequestStatusAC} from "./app-reduser";
import {disableButtonAC} from "./login-reducer";

export type CardsInitialStateType = typeof initialState

let initialState = {
    cards: [] as Array<CardType>,
    buttonDisable: false
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
                cards: [...state.cards, action.newCard]
            }
        case cardsActionsTypes["DELETE-CARD"]:
            return {...state, cards: [...state.cards.filter(id => id._id !== action.idCard)]}
        case cardsActionsTypes.DISABLE:
            return {...state, buttonDisable: action.disable}
        default:
            return state
    }
}

//AC
export const getCards = (cards: Array<CardType>) => ({type: cardsActionsTypes["SET-CARDS"], cards} as const)
export const setNewCard = (newCard: CardType) => ({type: cardsActionsTypes["SET-NEW-CARD"], newCard} as const)
export const deleteCard = (idCard: string) => ({type: cardsActionsTypes["DELETE-CARD"], idCard} as const)
export const disableButton = (disable: boolean) => ({type: cardsActionsTypes["DISABLE"], disable} as const)

export type CardsActionType = ReturnType<typeof getCards>
    | ReturnType<typeof setNewCard>
    | ReturnType<typeof deleteCard>
    | ReturnType<typeof disableButton>

export enum cardsActionsTypes {
    'SET-CARDS' = 'CARDS/CARDS/SET-CARDS',
    'SET-NEW-CARD' = 'CARDS/CARDS/SET-NEW-CARD',
    'DELETE-CARD' = 'CARDS/CARDS/DELETE-CARD',
    DISABLE = 'CARDS/CARDS/BUTTON'
}

//TC
export const getNewCardsTC = (id: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setRequestStatusAC('loading'))
        dispatch(disableButton(true))
        cardsAPI.getCards(id)
            .then(res => {
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
    return (dispatch: Dispatch) => {
        cardsAPI.createCard(card)
            .then(res => {
                dispatch(setNewCard(res.data))
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
    return (dispatch: Dispatch) => {
        cardsAPI.deleteCard(idCard)
            .then(res => {
                dispatch(deleteCard(res.data._id))
            })
            .catch((e) => {
                dispatch(setErrorProfilePage(e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console')
                ))
            })
    }
}

export default cardsReducer
