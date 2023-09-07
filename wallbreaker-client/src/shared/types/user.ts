import AccountTypes from './AccountTypes'

export interface IUser {
    email: string
    id: string
    accountType: AccountTypes
    isActivated: boolean
    cash: number
    username?: string
}

export interface UserState {
    user: IUser
    auth: boolean
    authChecked: boolean
    loading: boolean
    error: string | null
}

export enum UserActionsTypes {
    LOGIN = 'LOGIN',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_ERROR = 'LOGIN_ERROR',

    LOGOUT = 'LOGOUT',
    LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
    LOGOUT_ERROR = 'LOGOUT_ERROR',

    CHECK_AUTH = 'CHECK_AUTH',
    CHECK_AUTH_SUCCESS = 'CHECK_AUTH_SUCCESS',
    CHECK_AUTH_ERROR = 'CHECK_AUTH_ERROR',

    SET_USERNAME = 'SET_USERNAME',
    SET_USERNAME_SUCCESS = 'SET_USERNAME_SUCCESS',
    SET_USERNAME_ERROR = 'SET_USERNAME_ERROR',
}

interface LoginAction {
    type: UserActionsTypes.LOGIN
}

interface LoginSuccessAction {
    type: UserActionsTypes.LOGIN_SUCCESS
    payload: IUser
}

interface LoginErrorAction {
    type: UserActionsTypes.LOGIN_ERROR
    payload: string
}

interface LogoutAction {
    type: UserActionsTypes.LOGOUT
}

interface LogoutSuccessAction {
    type: UserActionsTypes.LOGOUT_SUCCESS
}

interface LogoutErrorAction {
    type: UserActionsTypes.LOGOUT_ERROR
    payload: string
}

interface CheckAuthAction {
    type: UserActionsTypes.CHECK_AUTH
}

interface CheckAuthSuccessAction {
    type: UserActionsTypes.CHECK_AUTH_SUCCESS
    payload: IUser
}

interface CheckAuthErrorAction {
    type: UserActionsTypes.CHECK_AUTH_ERROR
    payload: string
}

interface SetUsernameAction {
    type: UserActionsTypes.SET_USERNAME
}

interface SetUsernameSuccessAction {
    type: UserActionsTypes.SET_USERNAME_SUCCESS
    payload: string
}

interface SetUsernameErrorAction {
    type: UserActionsTypes.SET_USERNAME_ERROR
    payload: string
}

export type UserAction =
    LoginAction | LoginSuccessAction | LoginErrorAction |
    LogoutAction | LogoutSuccessAction | LogoutErrorAction |
    CheckAuthAction | CheckAuthSuccessAction | CheckAuthErrorAction |
    SetUsernameAction | SetUsernameSuccessAction | SetUsernameErrorAction
