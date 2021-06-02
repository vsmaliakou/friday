import {Dispatch} from "redux";
import {packsAPI} from "../../dal/packs/packsAPI";

export type PacksActionType = ReturnType<typeof getPacksAC>
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

let initialState: Array<CardPacksType> = []

const packsReducer = (state = initialState, action: PacksActionType): PacksInitialStateType => {
    switch (action.type) {
        case 'CARDS/PACKS/GET-PACKS':
            return [...state,
                ...action.packs]
        default:
            return state
    }
}

export const getPacksAC = (packs: Array<CardPacksType>) => ({type: 'CARDS/PACKS/GET-PACKS', packs} as const)

export const getPacksTC = () => (dispatch: Dispatch) => {
    return packsAPI.getPacks()
        .then(response => {
            console.log(response.data.cardPacks)
            dispatch(getPacksAC(response.data.cardPacks))
        })
}

export default packsReducer
