import {instance} from "../instance";

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
export type newValueCardType = {
    _id: string,
    question: string
    answer: string
}
type NewCardType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    rating?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    type?: string
}

export const cardsAPI = {
    getCards(cardAnswer: string, cardQuestion: string, cardsPack_id: string, min: number, max: number, sortCards: string, page: number, pageCount: number) {
        return instance.get<GetCardsType>(`cards/card?cardsPack_id=${cardsPack_id}`,({params: {cardAnswer, cardQuestion, min, max, sortCards, page, pageCount}}))
    },
    createCard(card: NewCardType) {
        return instance.post<CardType>(`cards/card?cardsPack_id=${card.cardsPack_id}`, {card})
    },
    deleteCard(idCard: string) {
        return instance.delete<CardType>(`cards/card?id=${idCard}`)
    },
    changeValueCard(card: newValueCardType) {
        return instance.put<CardType>(`cards/card?id=${card._id}`, {card})
    },
    changeGradeCard(card_id: string, grade: null | number) {
        return instance.put<CardType>(`cards/grade`, {card_id, grade})
    }
}