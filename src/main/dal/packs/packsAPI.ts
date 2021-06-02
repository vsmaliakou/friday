import {instance} from "../auth/instance";

export const packsAPI = {
    getPacks() {
        return instance.get('cards/pack')
    }
}