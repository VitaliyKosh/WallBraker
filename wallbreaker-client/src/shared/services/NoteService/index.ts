import { AxiosResponse } from 'axios'
import $api, { API_URL } from 'shared/lib/http'

export default class AuthService {
    static async loadWeek(): Promise<AxiosResponse<any>> {
        return await $api.get(API_URL + '/week/2023-04-29T00:00:00.000+00:00')
    }
}
