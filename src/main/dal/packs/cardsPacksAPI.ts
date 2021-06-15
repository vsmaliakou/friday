import {instance} from "../instance";

type GetResponseType = {
    cardPacks: CardsPacksType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number

}
type AddResponseType = {
    newCardsPack: CardsPacksType
    token: string
    tokenDeathTime: number
}
type RemoveResponseType = {
    deletedCardsPack: CardsPacksType
    token: string
    tokenDeathTime: number
}
type UpdateResponseType = {
    token: string
    tokenDeathTime: number
    updatedCardsPack: CardsPacksType
}
type CardsPackType = {
    _id: string
    name: string
}
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
}

export const cardsPacksAPI = {
    getCardsPacks(packName: string, min: number, max: number, sortPacks: string, page: number, pageCount: number, user_id: string) {
        return instance.get<GetResponseType>('cards/pack', ({params: {packName, min, max, sortPacks, page, pageCount, user_id}}))
    },
    addNewCardsPack(cardsPack: NewCardsPackType) {
        return instance.post<AddResponseType>('cards/pack', {cardsPack})
    },
    removeCardsPack(id: string) {
        return instance.delete<RemoveResponseType>(`cards/pack/?id=${id}`)
    },
    updatePack(cardsPack: CardsPackType) {
        return instance.put<UpdateResponseType>(`cards/pack`, {cardsPack})
    }
}