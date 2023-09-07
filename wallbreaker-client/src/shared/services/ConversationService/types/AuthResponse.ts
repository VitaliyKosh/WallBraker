import { IConversation } from 'shared/types/conversations'
import { IParticipant } from 'shared/types/participant'

export interface GetAllConversationsResponse {
    conversations: IConversation[]
}

export interface GetConversation {
    conversation: IConversation
}

export interface GetAllParticipants {
    participants: IParticipant[]
}
