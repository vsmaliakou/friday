import {Dispatch} from "redux";
import {loginAPI, LoginType} from "../../dal/auth/loginApi";
import {setRequestStatusAC} from "./app-reduser";

export type LoginActionType = ReturnType<typeof setUserData>
    | ReturnType<typeof setErrorPageAC>
    | ReturnType<typeof setNewValueAuth>

export type LoginInitialStateType = typeof initialState

let initialState = {
    dataUser: {} as LoginType | null,
    errorMessage: null as string | null,
    auth: false
}

const loginReducer = (state = initialState, action: LoginActionType): LoginInitialStateType => {
    switch (action.type) {
        case 'CARDS/LOGIN/POST-LOGIN-DATA':
            return {
                ...state,
                dataUser: action.dataUser,
            }
        case 'CARDS/LOGIN/NEW-VALUE-AUTH':
            return {
                ...state,
                auth: action.value
            }
        case 'CARDS/LOGIN/SET-ERROR-MESSAGE':
            return {
                ...state,
                errorMessage: action.error
            }
        default:
            return state
    }
}

export const setUserData = (dataUser: LoginType | null) => ({type: 'CARDS/LOGIN/POST-LOGIN-DATA', dataUser} as const)
export const setNewValueAuth = (value: boolean) => ({type: 'CARDS/LOGIN/NEW-VALUE-AUTH', value} as const)
export const setErrorPageAC = (error: string) => ({type: 'CARDS/LOGIN/SET-ERROR-MESSAGE', error} as const)

export const newUserDataTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    dispatch(setRequestStatusAC('loading'))
    loginAPI.postLogin(email, password, rememberMe)
        .then((res) => {
            dispatch(setUserData(res.data))
            dispatch(setNewValueAuth(true))
            dispatch(setRequestStatusAC('success'))
        })
        .catch((e) => {
            dispatch(setErrorPageAC(e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            ))
            dispatch(setRequestStatusAC('success'))
        })
}

export default loginReducer
