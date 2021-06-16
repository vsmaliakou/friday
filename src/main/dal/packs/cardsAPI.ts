import {instance} from "../instance";
import {NewCardType} from "../../ui/components/packs/cards/AddNewCard/AddNewCardContainer";

export type CardType = {
    answer: string
    answerImg: string
    answerVideo: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    questionImg: string
    questionVideo: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}
export type GetCardsType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export const cardsAPI = {
    getCards(id: string) {
        return instance.get<GetCardsType>(`cards/card?cardsPack_id=${id}`)
    },
    createCard(card: NewCardType) {
        return instance.post<CardType>(`cards/card?cardsPack_id=${card.cardsPack_id}`, {card})
    },
    deleteCard(idCard: string) {
        return instance.delete<CardType>(`cards/card?id=${idCard}`)
    }
}