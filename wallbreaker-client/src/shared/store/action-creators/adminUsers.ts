import { Dispatch } from 'react'
import AdminUserService from 'shared/services/AdminUserService'
import { AdminUsersAction, AdminUsersActionsTypes } from 'shared/types/adminUsers'

export const getAllAdminUsers = () => {
    return async (dispatch: Dispatch<AdminUsersAction>) => {
        try {
            dispatch({ type: AdminUsersActionsTypes.FETCH_ADMIN_USERS })

            const response = await AdminUserService.getAllUsers()

            dispatch({
                type: AdminUsersActionsTypes.FETCH_ADMIN_USERS_SUCCESS,
                payload: response.data.users
            })
        } catch (e) {
            dispatch({
                type: AdminUsersActionsTypes.FETCH_ADMIN_USERS_ERROR,
                payload: 'Ошибка при загрузке пользователей'
            })
            console.log(e)
        }
    }
}
