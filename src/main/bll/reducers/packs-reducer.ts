import {Dispatch} from "redux";
import {packsAPI} from "../../dal/packs/packsAPI";

export type PacksActionType = ReturnType<typeof getPacksAC>
    | ReturnType<typeof addPacksAC>
export type PacksInitialStateType = typeof initialState

export type CardPacksType = {
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
export type CardsPackType = {
    name: string
    path: string
    grade: number
    shots: number
    rating: number
    deckCover: string
    private: boolean
    type: string
}

let initialState: Array<CardPacksType> = []

const packsReducer = (state = initialState, action: PacksActionType): PacksInitialStateType => {
    switch (action.type) {
        case 'CARDS/PACKS/GET-PACKS':
            return [...state,
                ...action.packs]
        case 'CARDS/PACKS/ADD-PACKS':
            return [action.newCardsPack, ...state]
        default:
            return state
    }
}

export const getPacksAC = (packs: Array<CardPacksType>) => ({type: 'CARDS/PACKS/GET-PACKS', packs} as const)
export const addPacksAC = (newCardsPack: CardPacksType) => ({type: 'CARDS/PACKS/ADD-PACKS', newCardsPack} as const)

export const getPacksTC = () => (dispatch: Dispatch) => {
    return packsAPI.getPacks()
        .then(response => {
            dispatch(getPacksAC(response.data.cardPacks))
        })
        .catch(e => {
            console.log(e.response.error)
        })
}
export const addPacksTC = (cardsPack: CardsPackType) => (dispatch: Dispatch) => {
    return packsAPI.addPack(cardsPack)
        .then(response => {
            console.log(response)
            dispatch(addPacksAC(response.data.newCardsPack))
        })
        .catch(e => {
            // console.log(e.response.error)
        })
}

export default packsReducer
