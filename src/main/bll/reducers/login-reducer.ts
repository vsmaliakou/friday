import {Dispatch} from "redux";
import {loginAPI, LoginType} from "../../dal/auth/login/loginApi";

export type LoginActionType = ReturnType<typeof loginAC>
export type LoginInitialStateType = typeof initialState

let initialState = {
    // avatar: '',
    // created: ,
    // email: '',
    // isAdmin: false,
    // name: '',
    // publicCardPacksCount: 0,
    // rememberMe: false,
    // token: '',
    // tokenDeathTime: 0,
    // updated: ,
    // verified: false,
    // __v: number,
    // _id: string,
}

const loginReducer = (state = initialState, action: LoginActionType): LoginInitialStateType => {
    switch (action.type) {
        case 'login/POST_LOGIN_DATA':
            return {
                ...state
            }
        default:
            return state
    }
}

export const loginAC = (dataUser: any) => ({
    type: 'login/POST_LOGIN_DATA',
    dataUser
} as const)

export const postUserDataTC = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: Dispatch) => {
        loginAPI.postLogin(email, password, rememberMe)
            .then((res) => {
                dispatch(loginAC(res))
                debugger
            })
    }
}


export default loginReducer
