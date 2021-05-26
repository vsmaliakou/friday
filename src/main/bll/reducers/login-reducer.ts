export type LoginActionType = ReturnType<typeof loginAC>
export type LoginInitialStateType = typeof initialState

let initialState = {}

const loginReducer = (state = initialState, action: LoginActionType): LoginInitialStateType => {
    switch (action.type) {
        case '':
        default:
            return state
    }
}

export const loginAC = () => ({type: ''} as const)

export default loginReducer
