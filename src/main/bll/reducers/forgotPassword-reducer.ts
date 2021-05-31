import {Dispatch} from "redux";
import {forgotAPI} from "../../dal/auth/forgotPassword/forgotPasswordApi";

export type ForgotPasswordActionType = ReturnType<typeof forgotPasswordAC> | ReturnType<typeof setErrorAC>
export type ForgotPasswordInitialStateType = typeof initialState

let initialState = {
    email: '',
    error: ''
}

const forgotPasswordReducer = (state = initialState, action: ForgotPasswordActionType): ForgotPasswordInitialStateType => {
    switch (action.type) {
        case "CARDS/REGISTER/FORGOT_PASSWORD":{
            return {...state, email: action.email}
        }
        case "CARDS/REGISTER/SET_ERROR":{
            return {...state, error: action.error}
        }
        default:
            return state
    }
}

export const forgotPasswordAC = (email: string) => ({type: 'CARDS/REGISTER/FORGOT_PASSWORD', email} as const)
export const setErrorAC = (error: string) => ({type: 'CARDS/REGISTER/SET_ERROR', error} as const)

export const forgotPasswordTC = (email: string, from:string, message: string)  => (dispatch: Dispatch) => {
    return forgotAPI.postForgotPassword(email, from, message)
        .then(response => {
            console.log(response)
        }).catch(e => {
            dispatch(setErrorAC(e.response.data.error))
        })
}


export default forgotPasswordReducer
