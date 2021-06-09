import {Dispatch} from "redux";
import {setUserData} from "./login-reducer";
import {profileAPI, ProfileDataType} from "../../dal/profile/profileApi";

export const profileActionsTypes = {
    'SET-DATA': 'CARDS/PROFILE/SET-PROFILE-DATA',
    ERROR: 'CARDS/PROFILE/SET-ERROR-MESSAGE',
    'NEW-NAME': 'CARDS/PROFILE/SET-NEW-NAME-PROFILE',
    'NEW-AVATAR': 'CARDS/PROFILE/SET-NEW-AVATAR-PROFILE'
} as const;

export type ProfileActionType = ReturnType<typeof setProfileDataAC>
    | ReturnType<typeof setErrorProfilePage>
    | ReturnType<typeof setNewNameProfile>
    | ReturnType<typeof setNewAvatarProfile>

export type ProfileInitialStateType = typeof initialState

let initialState = {
    profileData: null as ProfileDataType | null,
    errorMessage: null as string | null
}

const profileReducer = (state = initialState, action: ProfileActionType): ProfileInitialStateType => {
    switch (action.type) {
        case profileActionsTypes["SET-DATA"]:
            return {
                ...state,
                profileData: action.data
            }
        case profileActionsTypes.ERROR:
            return {
                ...state,
                errorMessage: action.error
            }
        // case profileActionsTypes["NEW-NAME"]:
        //     return {
        //         ...state,
        //         profileData: {
        //             ...state.profileData, avatar: action.avatar
        //         }
        //     }
        default:
            return state
    }
}

//AC
export const setProfileDataAC = (data: ProfileDataType) => ({type: profileActionsTypes["SET-DATA"], data} as const)
export const setErrorProfilePage = (error: string) => ({type: profileActionsTypes.ERROR, error} as const)
export const setNewNameProfile = (name: string) => ({type: profileActionsTypes["NEW-NAME"], name} as const)
export const setNewAvatarProfile = (avatar?: any) => ({type: profileActionsTypes["NEW-AVATAR"], avatar} as const)

//TC
export const authTC = () => {
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

export const changeNameProfileTC = (name: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.changeNameProfile(name)
            .then(res => {
                dispatch(setNewNameProfile(res.data.updateUser.name))
                debugger
            })
    }
}
export const changeAvatarProfileTC = (avatar?: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.changeAvatarProfile(avatar)
            .then(res => {
                dispatch(setNewAvatarProfile(res.data.updateUser.avatar))
                debugger
            })
    }
}

export default profileReducer
