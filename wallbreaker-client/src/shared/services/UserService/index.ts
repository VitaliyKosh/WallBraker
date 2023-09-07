import { AxiosResponse } from 'axios'
import $api, { API_URL } from 'shared/lib/http'

export default class userService {
    static async setUsername (username: string): Promise<AxiosResponse<string>> {
        return await $api.post(API_URL + '/user/username', { username })
    }
}
