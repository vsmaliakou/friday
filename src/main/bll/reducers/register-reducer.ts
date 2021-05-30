import {Dispatch} from "redux";
import {PayloadType, registerAPI} from "../../dal/auth/register/registerAPI";

export type RegisterActionType = ReturnType<typeof registerAC>
export type RegisterInitialStateType = typeof initialState

let initialState = {
    email: null as string | null,
    password: null as string | null
}

const registerReducer = (state = initialState, action: RegisterActionType): RegisterInitialStateType => {
    switch (action.type) {
        case 'CARDS/REGISTER/SET-REGISTRATION-DATA':
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }
}

export const registerAC = (payload: PayloadType) => ({type: 'CARDS/REGISTER/SET-REGISTRATION-DATA', payload} as const)

export const setRegistrationDataTC = (email: string, password: string) => (dispatch: Dispatch) => {
    return registerAPI.setRegisterData({email, password})
        .then(response => {
            dispatch(registerAC(response.data))
        })
}

export default registerReducer
