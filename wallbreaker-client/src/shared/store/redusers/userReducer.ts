/* eslint-disable max-len */
import { UserActionsTypes, UserState, UserAction, IUser } from '../../types/user'

const initialState: UserState = {
    user: {} as unknown as IUser,
    authChecked: false,
    auth: false,
    loading: false,
    error: null
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
    case UserActionsTypes.LOGIN:
        return { ...state, loading: true }
    case UserActionsTypes.LOGIN_SUCCESS:
        return { ...state, loading: false, user: action.payload, auth: true }
    case UserActionsTypes.LOGIN_ERROR:
        return { ...state, loading: false, error: action.payload, auth: false }

    case UserActionsTypes.LOGOUT:
        return { ...state, loading: true }
    case UserActionsTypes.LOGOUT_SUCCESS:
        return { ...state, loading: false, user: {} as unknown as IUser, auth: false }
    case UserActionsTypes.LOGOUT_ERROR:
        return { ...state, loading: false, error: action.payload }

    case UserActionsTypes.CHECK_AUTH:
        return { ...state, loading: true, authChecked: false }
    case UserActionsTypes.CHECK_AUTH_SUCCESS:
        return { ...state, loading: false, user: action.payload, auth: true, authChecked: true }
    case UserActionsTypes.CHECK_AUTH_ERROR:
        return { ...state, loading: false, user: {} as unknown as IUser, error: action.payload, auth: false, authChecked: true }

    case UserActionsTypes.SET_USERNAME:
        return { ...state, loading: true }
    case UserActionsTypes.SET_USERNAME_SUCCESS:
        return { ...state, loading: false, user: { ...state.user, username: action.payload } }
    case UserActionsTypes.SET_USERNAME_ERROR:
        return { ...state, loading: false, error: action.payload }

    default:
        return state
    }
}
