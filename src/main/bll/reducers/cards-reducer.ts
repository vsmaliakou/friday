import {Dispatch} from "redux";
import {cardsAPI, CardsType, CardType} from "../../dal/packs/cardsAPI";
import {setErrorProfilePage} from "./profile-reducer";

export type CardsActionType = ReturnType<typeof cardsAC>
    // | ReturnType<typeof setNewCard>

export const cardsActionsTypes = {
    'SET-CARDS': 'CARDS/CARDS/SET-CARDS',
    'SET-NEW-CARD': 'CARDS/CARDS/SET-NEW-CARD'
}

export type CardsInitialStateType = typeof initialState

let initialState = {
    cards: [] as Array<CardsType>,
    errorMessage: null as string | null
}

const cardsReducer = (state = initialState, action: CardsActionType): CardsInitialStateType => {
    switch (action.type) {
        case cardsActionsTypes["SET-CARDS"]:
            debugger
            return {
                ...state,
                cards: action.cards
            }
        default:
            return state
    }
}

//AC
export const cardsAC = (cards: Array<CardsType>) => ({type: cardsActionsTypes["SET-CARDS"], cards} as const)
// export const setNewCard = (cards: any) => ({type: cardsActionsTypes["SET-NEW-CARD"], cards} as const)

//TC
export const getNewCardsTC = (id: string) => {
    return (dispatch: Dispatch) => {
        cardsAPI.getCards(id)
            .then(res => {
                dispatch(cardsAC(res.data.cards))
            })
            .catch((e) => {
                dispatch(setErrorProfilePage(e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console')
                ))
            })
    }
}

export const createNewCardTC = (card: CardType) => {
    return (dispatch: Dispatch) => {
        cardsAPI.createCard(card)
            .then(res => {
                // dispatch(setNewCard(res.data)) //???
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
