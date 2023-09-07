export interface AuthState {
    auth: boolean;
}

export enum AuthActionsTypes {
    SET_AUTH = 'SET_AUTH',
}

interface SetAuthAction {
    type: AuthActionsTypes.SET_AUTH;
    payload: boolean;
}

export type AuthAction = SetAuthAction