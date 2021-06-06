import {Dispatch} from "redux";
import {profileAPI, ProfileDataType} from "../../dal/auth/profile/profileApi";
import {setUserData} from "./login-reducer";

export type ProfileActionType = ReturnType<typeof setProfileDataAC>
    | ReturnType<typeof setErrorProfilePage>

export type ProfileInitialStateType = typeof initialState

let initialState = {
    profileData: null as ProfileDataType | null,
    errorMessage: null as string | null
}

const profileReducer = (state = initialState, action: ProfileActionType): ProfileInitialStateType => {
    switch (action.type) {
        case 'CARDS/PROFILE/SET-PROFILE-DATA':
            return {
                ...state,
                profileData: action.data
            }
        case "CARDS/PROFILE/SET-ERROR-MESSAGE":
            return {
                ...state,
                errorMessage: action.error
            }
        default:
            return state
    }
}

//AC
export const setProfileDataAC = (data: ProfileDataType) => ({type: 'CARDS/PROFILE/SET-PROFILE-DATA', data} as const)
export const setErrorProfilePage = (error: string) => ({type: 'CARDS/PROFILE/SET-ERROR-MESSAGE', error} as const)

//TC
export const checkDataUserTC = () => {
    return (dispatch: Dispatch) => {
        profileAPI.authProfileData()
            .then(res => {
                dispatch(setProfileDataAC(res.data))
                dispatch(setUserData(res.data))
            })
            .catch((e) => {
                dispatch(setErrorProfilePage(e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console')
                ))
            })
    }
}

export default profileReducer
