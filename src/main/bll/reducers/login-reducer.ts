import {Dispatch} from "redux";
import {loginAPI, LoginType} from "../../dal/auth/login/loginApi";

export type LoginActionType = ReturnType<typeof loginAC>
// export type LoginInitialStateType = typeof initialState

let initialState: LoginType = {
    avatar: '',
    created: {} as Date,
    email: '',
    isAdmin: false,
    name: '',
    publicCardPacksCount: 0,
    rememberMe: false,
    token: '',
    tokenDeathTime: 0,
    updated: {} as Date,
    verified: false,
    __v: 0,
    _id: ''
}

const loginReducer = (state = initialState, action: LoginActionType): LoginType => {
    switch (action.type) {
        case 'login/POST_LOGIN_DATA':
            return {...state = action.dataUser}
        default:
            return state
    }
}

export const loginAC = (dataUser: LoginType) => ({
    type: 'login/POST_LOGIN_DATA',
    dataUser
} as const)

export const postUserDataTC = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: Dispatch) => {
        loginAPI.postLogin(email, password, rememberMe)
            .then((res) => {
                dispatch(loginAC(res.data))
            })

    }
}


export default loginReducer
