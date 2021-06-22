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
export type newValueCardType = {
    _id: string,
    question: string
    answer: string
}
export type newGradeCardType = {
    grade: number
    card_id: string
}

export const cardsAPI = {
    getCards(id: string/*min: number, max: number, sortCards: string, page: number, pageCount: number*/) {
        return instance.get<GetCardsType>(`cards/card?cardsPack_id=${id}`,
            //     params: {
            //         min,
            //         max,
            //         sortCards,
            //         page,
            //         pageCount
            //     }
            // })
        )
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