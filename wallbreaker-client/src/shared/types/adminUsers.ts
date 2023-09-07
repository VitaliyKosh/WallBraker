export interface IAdminUser {
    email: string
    id: string
    accountType: string
    isActivated: boolean
    cash: number
    lastOnline: Date
    username?: string
}

export interface IAdminUserOnline {
    id: string
    lastOnline: Date
}

export interface AdminUsersState {
    users: IAdminUser[]
    loading: boolean
    error: string | null
}

export enum AdminUsersActionsTypes {
    FETCH_ADMIN_USERS = 'FETCH_ADMIN_USERS',
    FETCH_ADMIN_USERS_SUCCESS = 'FETCH_ADMIN_USERS_SUCCESS',
    FETCH_ADMIN_USERS_ERROR = 'FETCH_ADMIN_USERS_ERROR',

    CHECK_ONLINE = 'CHECK_ONLINE',
    CHECK_ONLINE_SUCCESS = 'CHECK_ONLINE_SUCCESS',
    CHECK_ONLINE_ERROR = 'CHECK_ONLINE_ERROR',
}

interface FetchUsersAction {
    type: AdminUsersActionsTypes.FETCH_ADMIN_USERS
}

interface FetchUsersSuccessAction {
    type: AdminUsersActionsTypes.FETCH_ADMIN_USERS_SUCCESS
    payload: IAdminUser[]
}

interface FetchUsersErrorAction {
    type: AdminUsersActionsTypes.FETCH_ADMIN_USERS_ERROR
    payload: string
}

interface CheckOnlineAction {
    type: AdminUsersActionsTypes.CHECK_ONLINE
}

interface CheckOnlineSuccessAction {
    type: AdminUsersActionsTypes.CHECK_ONLINE_SUCCESS
    payload: IAdminUserOnline[]
}

interface CheckOnlineErrorAction {
    type: AdminUsersActionsTypes.CHECK_ONLINE_ERROR
    payload: string
}

export type AdminUsersAction =
    FetchUsersAction | FetchUsersSuccessAction | FetchUsersErrorAction |
    CheckOnlineAction | CheckOnlineSuccessAction | CheckOnlineErrorAction
