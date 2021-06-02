import {Dispatch} from "redux"
import {logOutAPI, LogOutDataType} from "../../dal/auth/logOut/logOutApi"
import {setErrorProfilePage} from "./profile-reducer";

export type LogOutActionType = ReturnType<typeof logOutOfProfileAC>

export type LogOutInitialStateType = typeof initialState

let initialState = {
    logOutInfo: null as string | null,
    errorMessage: null as string | null
}

const logOutReducer = (state = initialState, action: LogOutActionType): LogOutInitialStateType => {
    switch (action.type) {
        case "CARDS/LOGOUT/LOG-OUT-OF-PROFILE":
            return {
                ...state,
                logOutInfo: action.data
            }
        default:
            return state
    }
}

export const logOutOfProfileAC = (data: string) => ({type: 'CARDS/LOGOUT/LOG-OUT-OF-PROFILE', data} as const)

export const logOutTC = () => {
    return (dispatch: Dispatch) => {
        logOutAPI.logOutOfProfile()
            .then(res => {
                dispatch(logOutOfProfileAC(res.data.info))
                debugger
            })
            .catch((e) => {
                dispatch(setErrorProfilePage(e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console')
                ))
            })
    }
}

export default logOutReducer
