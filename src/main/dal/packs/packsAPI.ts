import {instance} from "../auth/instance";
import {CardsPackType} from "../../bll/reducers/packs-reducer";

export const packsAPI = {
    getPacks() {
        return instance.get('cards/pack')
    },
    addPack(cardsPack: CardsPackType){
        return instance.post('cards/pack', {cardsPack})
    }
}