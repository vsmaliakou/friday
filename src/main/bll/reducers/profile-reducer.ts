import {Dispatch} from "redux";
import {setNewValueAuth, setUserData} from "./login-reducer";
import {profileAPI, ProfileDataType} from "../../dal/profile/profileApi";
import {setRequestStatusAC} from "./app-reduser";
import {ThunkDispatch} from "redux-thunk";
import {AppActionsType, AppRootStateType} from "../store";

export const profileActionsTypes = {
    'ERROR': 'CARDS/PROFILE/SET-ERROR-MESSAGE',
    'NEW-NAME': 'CARDS/PROFILE/SET-NEW-NAME-PROFILE',
    'NEW-AVATAR': 'CARDS/PROFILE/SET-NEW-AVATAR-PROFILE',
    'SET-USER-ID': 'CARDS/PROFILE/SET-USER-ID'
} as const;

export type ProfileActionType = ReturnType<typeof setErrorProfilePage>
    | ReturnType<typeof setNewNameProfile>
    | ReturnType<typeof setNewAvatarProfile>
    | ReturnType<typeof setUserId>

export type ProfileInitialStateType = typeof initialState

let initialState = {
    profileData: {} as ProfileDataType,
    errorMessage: null as string | null,
    userId: null as string | null
}

const profileReducer = (state = initialState, action: ProfileActionType): ProfileInitialStateType => {
    switch (action.type) {
        case profileActionsTypes.ERROR:
            return {
                ...state,
                errorMessage: action.error
            }
        case profileActionsTypes["NEW-AVATAR"]:
            return {
                ...state,
                profileData: {
                    ...state.profileData, avatar: action.avatar
                }
            }
        case profileActionsTypes["NEW-NAME"]:
            return {
                ...state,
                profileData: {
                    ...state.profileData, name: action.name

                }
            }
        case profileActionsTypes["SET-USER-ID"]:
            return {
                ...state,
                userId: action.userId
            }
        default:
            return state
    }
}

//AC
export const setErrorProfilePage = (error: string) => ({type: profileActionsTypes.ERROR, error} as const)
export const setNewNameProfile = (name: string) => ({type: profileActionsTypes["NEW-NAME"], name} as const)
export const setNewAvatarProfile = (avatar?: string) => ({type: profileActionsTypes["NEW-AVATAR"], avatar} as const)
export const setUserId = (userId: string) => ({type: profileActionsTypes["SET-USER-ID"], userId} as const)

//TC
export const authTC = () => {
    return (dispatch: Dispatch) => {
        profileAPI.authProfileData()
            .then(res => {
                dispatch(setUserId(res.data._id))
                dispatch(setUserData(res.data))
                dispatch(setNewValueAuth(true))
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
    return (dispatch: ThunkDispatch<AppRootStateType, unknown, AppActionsType>) => {
        dispatch(setRequestStatusAC('loading'))
        profileAPI.changeNameProfile(name)
            .then(res => {
                dispatch(setNewNameProfile(res.data.updatedUser.name))
                dispatch(authTC())
            })
            .catch((e) => {
                dispatch(setErrorProfilePage(e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console')
                ))
            })
            .finally(() => {
                    dispatch(setRequestStatusAC('success'))
                }
            )
    }
}
export const changeAvatarProfileTC = (avatar?: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setRequestStatusAC('loading'))
        profileAPI.changeAvatarProfile(avatar)
            .then(res => {
                dispatch(setNewAvatarProfile(res.data.updatedUser.avatar))
            })
            .catch((e) => {
                dispatch(setErrorProfilePage(e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console')
                ))
            })
            .finally(() => {
                    dispatch(setRequestStatusAC('success'))
                }
            )
    }
}

export default profileReducer
