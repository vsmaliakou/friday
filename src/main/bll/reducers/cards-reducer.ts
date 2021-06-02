export type CardsActionType = ReturnType<typeof cardsAC>
export type CardsInitialStateType = typeof initialState

let initialState = {}

const cardsReducer = (state = initialState, action: CardsActionType): CardsInitialStateType => {
    switch (action.type) {
        case '':
        default:
            return state
    }
}

export const cardsAC = () => ({type: ''} as const)

export default cardsReducer
