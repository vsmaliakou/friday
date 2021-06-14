import {instance} from "../instance";

export type CardsType = {
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
    cards: Array<CardsType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

//при создании карточки
export type CardType = {
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

//
export type newCard = {

}
// answer: "ok"
// cardsPack_id: "60c7883d761d1e00046a08ff"
// comments: ""
// created: "2021-06-14T17:29:55.650Z"
// grade: 0
// more_id: "60b61ca1276a5827480e436d"
// question: "yes?"
// rating: 0
// shots: 0
// type: "card"
// updated: "2021-06-14T17:29:55.650Z"
// user_id: "60b61ca1276a5827480e436d"
// __v: 0
// _id: "60c79213761d1e00046a0900"

export const cardsAPI = {
    getCards(id: string) {
        return instance.get<GetCardsType>(`cards/card?cardsPack_id=${id}`)
    },
    createCard(card: CardType) {
        return instance.post<any>(`cards/card?cardsPack_id=${card.cardsPack_id}`, {card})
    }
}