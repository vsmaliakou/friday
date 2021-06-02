import {Dispatch} from "redux";
import {cardsPacksAPI} from "../../dal/packs/cardsPacksAPI";

export type PacksActionType = ReturnType<typeof getCardsPacksAC>
    | ReturnType<typeof addNewCardsPackAC>
    | ReturnType<typeof removeCardsPackAC>
    | ReturnType<typeof updateCardsPackAC>
export type PacksInitialStateType = typeof initialState

export type CardsPacksType = {
    cardsCount: number
    created: string
    deckCover: null
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}
export type NewCardsPackType = {
    name: string
    path: string
    grade: number
    shots: number
    rating: number
    deckCover: string
    private: boolean
    type: string
}

let initialState: Array<CardsPacksType> = []

const cardsPacksReducer = (state = initialState, action: PacksActionType): PacksInitialStateType => {
    switch (action.type) {
        case 'CARDS/PACKS/GET-CARDS-PACKS':
            return [...state,
                ...action.cardsPacks]
        case 'CARDS/PACKS/ADD-NEW-CARDS-PACK':
            return [action.newCardsPack, ...state]
        case 'CARDS/PACKS/REMOVE-CARDS-PACK':
            return state.filter(p => p._id !== action.cardsPackId)
        case 'CARDS/PACKS/UPDATE-CARDS-PACK':
            return state.map(p => p._id === action.cardsPackId ? {...p, user_name: action.newName} : p)
        default:
            return state
    }
}

export const getCardsPacksAC = (cardsPacks: Array<CardsPacksType>) => ({type: 'CARDS/PACKS/GET-CARDS-PACKS', cardsPacks} as const)
export const addNewCardsPackAC = (newCardsPack: CardsPacksType) => ({type: 'CARDS/PACKS/ADD-NEW-CARDS-PACK', newCardsPack} as const)
export const removeCardsPackAC = (cardsPackId: string) => ({type: 'CARDS/PACKS/REMOVE-CARDS-PACK', cardsPackId} as const)
export const updateCardsPackAC = (cardsPackId: string, newName: string) => ({type: 'CARDS/PACKS/UPDATE-CARDS-PACK', cardsPackId, newName} as const)

export const getCardsPacksTC = () => (dispatch: Dispatch) => {
    return cardsPacksAPI.getCardsPacks()
        .then(response => {            
            dispatch(getCardsPacksAC(response.data.cardPacks))
        })
        .catch(e => {
            console.log(e.response.data.error)
        })
}
export const addNewCardsPackTC = (cardsPack: NewCardsPackType) => (dispatch: Dispatch) => {
    return cardsPacksAPI.addNewCardsPack(cardsPack)
        .then(response => {
            dispatch(addNewCardsPackAC(response.data.newCardsPack))
        })
        .catch(e => {
            console.log(e.response.data.error)
        })
}
export const removeCardsPackTC = (cardsPackId: string) => (dispatch: Dispatch) => {
    return cardsPacksAPI.removeCardsPack(cardsPackId)
        .then(response => {
            dispatch(removeCardsPackAC(response.data.deletedCardsPack._id))
        })
        .catch(e => {
            console.log(e.response.data.error)
        })
}
export const updateCardsPackTC = (_id: string, name: string) => (dispatch: Dispatch) => {
    return cardsPacksAPI.updatePack({_id, name})
        .then(response => {
            const data = response.data.updatedCardsPack
            dispatch(updateCardsPackAC(data._id, data.name))
        })
        .catch(e => {
            console.log(e.response.data.error)
        })
}

export default cardsPacksReducer
