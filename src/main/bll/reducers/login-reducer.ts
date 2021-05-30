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
        case 'login/POST_LOGIN_DATA':
            return {
                ...state,
                dataUser: action.dataUser
            }
        case "login/SET_ERROR_MESSAGE":
            return {
                ...state,
                errorMessage: action.error
            }
        default:
            return state
    }
}

export const loginAC = (dataUser: LoginType) => ({
    type: 'login/POST_LOGIN_DATA',
    dataUser
} as const)

export const setErrorPageAC = (error: string) => ({
    type: 'login/SET_ERROR_MESSAGE',
    error
} as const)

export const postUserDataTC = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: Dispatch) => {
        loginAPI.postLogin(email, password, rememberMe)
            .then((res) => {
                dispatch(loginAC(res.data))
            })
            .catch((e) => {
                const error = e.response.data.error
                dispatch(setErrorPageAC(error))
            })
    }
}

export default loginReducer
