import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import loginReducer, {LoginActionType} from "./reducers/login-reducer";
import registerReducer, {RegisterActionType} from "./reducers/register-reducer";
import profileReducer, {ProfileActionType} from "./reducers/profile-reducer";
import forgotPasswordReducer, {ForgotPasswordActionType} from "./reducers/forgotPassword-reducer";
import setPasswordReducer, {SetPasswordActionType} from "./reducers/setPassword-reducer";


export let rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    setPassword: setPasswordReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType = LoginActionType
    | RegisterActionType
    | ProfileActionType
    | ForgotPasswordActionType
    | SetPasswordActionType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

//@ts-ignore
window.store = store

export default store