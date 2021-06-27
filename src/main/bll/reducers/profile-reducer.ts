import {Dispatch} from "redux";
import {setNewValueAuth, setUserData} from "./login-reducer";
import {profileAPI, ProfileDataType} from "../../dal/profile/profileApi";
import {setRequestStatusAC} from "./app-reduser";
import {ThunkDispatch} from "redux-thunk";
import {AppActionsType, AppRootStateType} from "../store";

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
        case 'CARDS/PROFILE/SET-ERROR-MESSAGE':
            return {
                ...state,
                errorMessage: action.error
            }
        case 'CARDS/PROFILE/SET-NEW-AVATAR-PROFILE':
            return {
                ...state,
                profileData: {
                    ...state.profileData, avatar: action.avatar
                }
            }
        case 'CARDS/PROFILE/SET-NEW-NAME-PROFILE':
            return {
                ...state,
                profileData: {
                    ...state.profileData, name: action.name

                }
            }
        case 'CARDS/PROFILE/SET-USER-ID':
            return {
                ...state,
                userId: action.userId
            }
        default:
            return state
    }
}

export const setErrorProfilePage = (error: string) => ({type: 'CARDS/PROFILE/SET-ERROR-MESSAGE', error} as const)
export const setNewNameProfile = (name: string) => ({type: 'CARDS/PROFILE/SET-NEW-NAME-PROFILE', name} as const)
export const setNewAvatarProfile = (avatar?: string) => ({
    type: 'CARDS/PROFILE/SET-NEW-AVATAR-PROFILE',
    avatar
} as const)
export const setUserId = (userId: string) => ({type: 'CARDS/PROFILE/SET-USER-ID', userId} as const)

export const authTC = () => (dispatch: Dispatch) => {
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
export const changeNameProfileTC = (name: string) => (dispatch: ThunkDispatch<AppRootStateType, unknown, AppActionsType>) => {
    dispatch(setRequestStatusAC('loading'))
    profileAPI.changeNameProfile(name)
        .then(res => {
            dispatch(setNewNameProfile(res.data.updatedUser.name))
            dispatch(authTC())
            dispatch(setRequestStatusAC('success'))
        })
        .catch((e) => {
            dispatch(setErrorProfilePage(e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            ))
            dispatch(setRequestStatusAC('success'))
        })
}
export const changeAvatarProfileTC = (avatar?: string) => (dispatch: Dispatch) => {
    dispatch(setRequestStatusAC('loading'))
    profileAPI.changeAvatarProfile(avatar)
        .then(res => {
            dispatch(setNewAvatarProfile(res.data.updatedUser.avatar))
            dispatch(setRequestStatusAC('success'))
        })
        .catch((e) => {
            dispatch(setErrorProfilePage(e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            ))
            dispatch(setRequestStatusAC('success'))
        })
}

export default profileReducer
