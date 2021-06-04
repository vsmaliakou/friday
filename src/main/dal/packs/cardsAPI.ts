import {instance} from "../auth/instance";

export const cardsAPI = {
    getCards(id: string | undefined) {
        return instance.get(`cards/card?cardsPack_id=${id}`)
    },
}