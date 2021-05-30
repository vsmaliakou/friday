import {Dispatch} from "redux";
import {loginAPI, LoginType} from "../../dal/auth/login/loginApi";

export type LoginActionType = ReturnType<typeof loginAC>
    | ReturnType<typeof setErrorPageAC>
export type LoginInitialStateType = typeof initialState

let initialState = {
    dataUser: null as LoginType | null,
    errorMessage: ''
}

const loginReducer = (state = initialState, action: LoginActionType): LoginInitialStateType => {
    switch (action.type) {
        case 'CARDS/LOGIN/POST-LOGIN-DATA':
            return {
                ...state,
                dataUser: action.dataUser
            }
        case "CARDS/LOGIN/SET-ERROR-MESSAGE":
            return {
                ...state,
                errorMessage: action.error
            }
        default:
            return state
    }
}

export const loginAC = (dataUser: LoginType) => ({
    type: 'CARDS/LOGIN/POST-LOGIN-DATA',
    dataUser
} as const)

export const setErrorPageAC = (error: string) => ({
    type: 'CARDS/LOGIN/SET-ERROR-MESSAGE',
    error
} as const)

export const newUserDataTC = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: Dispatch) => {
        loginAPI.postLogin(email, password, rememberMe)
            .then((res) => {
                dispatch(loginAC(res.data))
            })
            .catch((e) => {
                dispatch(setErrorPageAC(e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console')
                ))
            })
    }
}

export default loginReducer
