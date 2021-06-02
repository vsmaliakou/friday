import React from 'react'
import s from './PacksContainer.module.css'
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {getCardsPacksTC, CardsPacksType, addNewCardsPackTC, removeCardsPackTC, updateCardsPackTC} from "../../../bll/reducers/cardsPacks-reducer";
import {AppRootStateType} from "../../../bll/store";

export const CardsPacksContainer = () => {

    const cardsPacks = useSelector<AppRootStateType, Array<CardsPacksType>>(state => state.packs)

    const dispatch = useDispatch()

    const getCardsPacks = () => {
        dispatch(getCardsPacksTC())
    }
    const newCardsPack = {
            name: "no Name",
            path: "/def",
            grade: 0,
            shots: 0,
            rating: 0,
            deckCover: "url or base64",
            private: false,
            type: "pack"
    }
    const addNewCardsPack = () => {
        dispatch(addNewCardsPackTC(newCardsPack))
    }
    const removeCardsPack = (packId: string) => {
        dispatch(removeCardsPackTC(packId))
    }
    const updateCardsPack = (packId: string) => {
        dispatch(updateCardsPackTC(packId, "new name"))
    }

    return (
        <div>
            <SuperButton onClick={getCardsPacks}>Get packs</SuperButton>
            <div className={s.tableHeader}>
                <span>Name</span>
                <span>cardsCount</span>
                <span>updated</span>
                <span>url</span>
                <button onClick={addNewCardsPack}>add</button>
            </div>
            <CardsPack
                cardsPacks={cardsPacks}
                removeCardsPack={removeCardsPack}
                updateCardsPack={updateCardsPack}
            />
        </div>
    )
}

type CardsPackPropsType = {
    cardsPacks: CardsPacksType[]
    removeCardsPack: (packId: string) => void
    updateCardsPack: (packId: string) => void
}

export const CardsPack: React.FC<CardsPackPropsType> = (props) => {
    return (
        <div>
            {
                props.cardsPacks.map(p => {

                    const removeCardsPack = () => {
                        props.removeCardsPack(p._id)
                    }
                    const updateCardsPack = () => {
                        props.updateCardsPack(p._id)
                    }

                    return (
                        <div className={s.userData}  key={p.user_id}>
                            <div>{p.user_name}</div>
                            <div>{p.cardsCount}</div>
                            <div>{p.updated}</div>
                            <div>{p.deckCover}</div>
                            <button onClick={removeCardsPack}>delete</button>
                            <button onClick={updateCardsPack}>update</button>
                        </div>
                    )
                })
            }
        </div>
    )
}