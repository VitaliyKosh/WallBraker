import {
    AdminUsersAction,
    AdminUsersActionsTypes,
    AdminUsersState,
    IAdminUser
} from 'shared/types/adminUsers'

const initialState: AdminUsersState = {
    users: [] as IAdminUser[],
    loading: false,
    error: null
}

export const adminUsersReducer = (
    state = initialState,
    action: AdminUsersAction
): AdminUsersState => {
    switch (action.type) {
        case AdminUsersActionsTypes.FETCH_ADMIN_USERS:
            return { ...state, loading: true }
        case AdminUsersActionsTypes.FETCH_ADMIN_USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload }
        case AdminUsersActionsTypes.FETCH_ADMIN_USERS_ERROR:
            return { ...state, loading: false, error: action.payload }

        // case AdminUsersActionsTypes.FETCH_ADMIN_USERS:
        //     return { ...state, loading: true }
        // case AdminUsersActionsTypes.FETCH_ADMIN_USERS_SUCCESS:
        //     return { ...state, loading: false, users: action.payload }
        // case AdminUsersActionsTypes.FETCH_ADMIN_USERS_ERROR:
        //     return { ...state, loading: false, error: action.payload }

        default:
            return state
    }
}
