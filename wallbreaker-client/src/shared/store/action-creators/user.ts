import { Dispatch } from 'react'
import AuthService from 'shared/services/AuthService'
import { AuthAction } from 'shared/services/AuthService/types/auth'
import { UserAction, UserActionsTypes } from '../../types/user'
import UserService from 'shared/services/UserService'

export const login = (email: string, password: string) => {
    return async (dispatch: Dispatch<UserAction | AuthAction>) => {
        try {
            dispatch({ type: UserActionsTypes.LOGIN })

            const response = await AuthService.login(email, password)

            localStorage.setItem('token', response.data.accessToken)

            dispatch({ type: UserActionsTypes.LOGIN_SUCCESS, payload: response.data.user })
        } catch (e) {
            dispatch({
                type: UserActionsTypes.LOGIN_ERROR,
                payload: 'Ошибка при авторизации'
            })
            console.log(e)
        }
    }
}

export const logout = () => {
    return async (dispatch: Dispatch<UserAction | AuthAction>) => {
        try {
            dispatch({ type: UserActionsTypes.LOGOUT })

            await AuthService.logout()

            localStorage.removeItem('token')

            dispatch({ type: UserActionsTypes.LOGOUT_SUCCESS })
        } catch (e) {
            dispatch({
                type: UserActionsTypes.LOGOUT_ERROR,
                payload: 'Ошибка при выходе из аккаунта'
            })
        }
    }
}

export const checkAuth = () => {
    return async (dispatch: Dispatch<UserAction | AuthAction>) => {
        try {
            dispatch({ type: UserActionsTypes.CHECK_AUTH })
            const response = await AuthService.checkAuth()

            console.log(response.data);
            

            localStorage.setItem('token', response.data.accessToken)
            dispatch({ type: UserActionsTypes.CHECK_AUTH_SUCCESS, payload: response.data.user })
        } catch (e) {
            dispatch({
                type: UserActionsTypes.CHECK_AUTH_ERROR,
                payload: 'Токен авторизации не валиден'
            })
        }
    }
}

export const setAuthChecked = () => {
    return async (dispatch: Dispatch<UserAction | AuthAction>) => {
        dispatch({
            type: UserActionsTypes.CHECK_AUTH_ERROR,
            payload: 'Не авторизован'
        })
    }
}

export const setUsername = (username: string) => {
    return async (dispatch: Dispatch<UserAction | AuthAction>) => {
        try {
            dispatch({ type: UserActionsTypes.SET_USERNAME })

            const response = await UserService.setUsername(username)

            dispatch({ type: UserActionsTypes.SET_USERNAME_SUCCESS, payload: response.data })
        } catch (e) {
            dispatch({
                type: UserActionsTypes.SET_USERNAME_ERROR,
                payload: 'Невозможно изменить имя пользователя'
            })
        }
    }
}
