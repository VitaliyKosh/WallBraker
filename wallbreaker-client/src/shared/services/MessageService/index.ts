import { AxiosResponse } from 'axios'
import $api, { API_URL } from 'shared/lib/http'
import { GetAllMessagesResponse } from './types/GetAllMessagesResponse'

export default class MessageService {
    static async getAllMessages (
        conversationId: string
    ): Promise<AxiosResponse<GetAllMessagesResponse>> {
        return await $api.get(API_URL + `/message/getConversation/${conversationId}`)
    }
}
