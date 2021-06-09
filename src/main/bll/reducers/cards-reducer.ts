import {Dispatch} from "redux";
import {cardsAPI} from "../../dal/packs/cardsAPI";
import {setErrorProfilePage} from "./profile-reducer";

export type CardsActionType = ReturnType<typeof cardsAC>

export const cardsActionsTypes = {
    'SET-CARDS': 'CARDS/CARDS/SET-CARDS'
}

export type CardsInitialStateType = typeof initialState

let initialState = {
    cards: null,
    errorMessage: null as string | null
}

const cardsReducer = (state = initialState, action: CardsActionType): CardsInitialStateType => {
    switch (action.type) {
        case cardsActionsTypes["SET-CARDS"]:
            return {
                ...state,
                cards: action.cards
            }
        default:
            return state
    }
}

export const cardsAC = (cards: any) => ({type: cardsActionsTypes["SET-CARDS"], cards} as const)

export const getNewCardsTC = (id: string | undefined) => {
    return (dispatch: Dispatch) => {
        cardsAPI.getCards(id)
            .then(res => {
                dispatch(cardsAC(res.data))
                debugger
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
