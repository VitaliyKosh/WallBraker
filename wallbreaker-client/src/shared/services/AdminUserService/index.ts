import { AxiosResponse } from 'axios'
import $api, { API_URL } from 'shared/lib/http'
import { GetAllUsersResponse } from './types/AdminUserResponse'

export default class AdminUserService {
    static async getAllUsers (): Promise<AxiosResponse<GetAllUsersResponse>> {
        return await $api.get(API_URL + '/adminUser/all')
    }
}
