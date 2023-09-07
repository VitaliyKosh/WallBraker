import { AxiosResponse } from 'axios'
import $api, { API_URL } from 'shared/lib/http'
import { AuthResponse } from 'shared/services/AuthService/types/AuthResponse'

export default class AuthService {
    static async registration (
        email: string,
        pass: string
    ): Promise<AxiosResponse<AuthResponse>> {
        return await $api.post(API_URL + '/auth/registration', { email, pass })
    }

    static async login (email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return await $api.post(API_URL + '/auth/login', { email, password })
    }

    static async logout (): Promise<void> {
        await $api.post(API_URL + '/auth/logout')
    }

    static async checkAuth (): Promise<AxiosResponse<AuthResponse>> {
        return await $api.get(`${API_URL}/auth/refresh`)
    }

    static async resetPasswordRequest (email: string): Promise<AxiosResponse<string>> {
        return await $api.post(API_URL + '/auth/resetPassword', { email })
    }

    static async resetPassword (link: string, pass: string): Promise<AxiosResponse<string>> {
        return await $api.post(API_URL + `/auth/resetPassword/${link}`, { pass })
    }
}
