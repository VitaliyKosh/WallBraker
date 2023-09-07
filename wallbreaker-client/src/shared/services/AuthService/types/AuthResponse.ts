import { IUser } from 'shared/types/user'

export interface AuthResponse {
    accessToken: string
    refreshToken: string
    user: IUser
}
