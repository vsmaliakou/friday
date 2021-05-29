export type LoginActionType = ReturnType<typeof loginAC>
export type LoginInitialStateType = typeof initialState

let initialState = {}

const loginReducer = (state = initialState, action: LoginActionType): LoginInitialStateType => {
    switch (action.type) {
        case 'login/POST_LOGIN_DATA':
            return {
                ...state,
                email: action.email,
                password: action.password,
                rememberMe: action.rememberMe
            }
        default:
            return state
    }
}

export const loginAC = (email: string, password: string, rememberMe: boolean) => ({
    type: 'login/POST_LOGIN_DATA',
    email,
    password,
    rememberMe
} as const)

export default loginReducer
