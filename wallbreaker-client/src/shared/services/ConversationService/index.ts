import { AxiosResponse } from 'axios'
import $api, { API_URL } from 'shared/lib/http'
import {
    GetAllConversationsResponse,
    GetAllParticipants,
    GetConversation
} from './types/AuthResponse'

export default class ConversationService {
    static async getAllConversations (): Promise<AxiosResponse<GetAllConversationsResponse>> {
        return await $api.get(API_URL + '/conversation/all')
    }

    static async getConversationByUserId (userId: string): Promise<AxiosResponse<GetConversation>> {
        return await $api.get(API_URL + '/conversation/byUserId/' + userId)
    }

    static async getAllParticipants (
        conversationId: string
    ): Promise<AxiosResponse<GetAllParticipants>> {
        return await $api.get(API_URL + '/conversation/' + conversationId + '/getParticipants/')
    }

    static async getFirstConversation (): Promise<AxiosResponse<GetConversation>> {
        return await $api.get(API_URL + '/conversation/first')
    }
}
