export type ForgotPasswordActionType = ReturnType<typeof forgotPasswordAC>
export type ForgotPasswordInitialStateType = typeof initialState

let initialState = {}

const forgotPasswordReducer = (state = initialState, action: ForgotPasswordActionType): ForgotPasswordInitialStateType => {
    switch (action.type) {
        case '':
        default:
            return state
    }
}

export const forgotPasswordAC = () => ({type: ''} as const)

export default forgotPasswordReducer
