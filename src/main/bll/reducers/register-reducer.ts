export type RegisterActionType = ReturnType<typeof registerAC>
export type RegisterInitialStateType = typeof initialState

let initialState = {}

const registerReducer = (state = initialState, action: RegisterActionType): RegisterInitialStateType => {
    switch (action.type) {
        case '':
        default:
            return state
    }
}

export const registerAC = () => ({type: ''} as const)

export default registerReducer
