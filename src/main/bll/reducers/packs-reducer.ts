export type PacksActionType = ReturnType<typeof packsAC>
export type PacksInitialStateType = typeof initialState

let initialState = {}

const packsReducer = (state = initialState, action: PacksActionType): PacksInitialStateType => {
    switch (action.type) {
        case '':
        default:
            return state
    }
}

export const packsAC = () => ({type: ''} as const)

export default packsReducer
