export type SetPasswordActionType = ReturnType<typeof setPasswordAC>
export type SetPasswordInitialStateType = typeof initialState

let initialState = {}

const setPasswordReducer = (state = initialState, action: SetPasswordActionType): SetPasswordInitialStateType => {
    switch (action.type) {
        case '':
        default:
            return state
    }
}

export const setPasswordAC = () => ({type: ''} as const)

export default setPasswordReducer
