export type ProfileActionType = ReturnType<typeof profileAC>
export type ProfileInitialStateType = typeof initialState

let initialState = {}

const profileReducer = (state = initialState, action: ProfileActionType): ProfileInitialStateType => {
    switch (action.type) {
        case '':
        default:
            return state
    }
}

export const profileAC = () => ({type: ''} as const)

export default profileReducer
