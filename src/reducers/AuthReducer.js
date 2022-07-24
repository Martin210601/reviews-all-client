export const authReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case 'SET AUTH':
            return {
                ...state,
                authLoading: false,
                isAuthenticated: payload.isAuthenticated,
                userInfo: payload.user
            }
        case 'SET AUTH FAIL':
            return {
                ...state,
                authLoading: false,
                isAuthenticated: payload.isAuthenticated
            }
        default:
            return state
    }
}