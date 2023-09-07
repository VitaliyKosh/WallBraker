export interface IConversation {
    id: string
    name: string
}

export interface ConversationsState {
    conversations: IConversation[]
    loading: boolean
    error: string | null
}

export enum ConversationsActionsTypes {
    FETCH_CONVERSATIONS = 'FETCH_CONVERSATIONS',
    FETCH_CONVERSATIONS_SUCCESS = 'FETCH_CONVERSATIONS_SUCCESS',
    FETCH_CONVERSATIONS_ERROR = 'FETCH_CONVERSATIONS_ERROR',
}

interface FetchUsersAction {
    type: ConversationsActionsTypes.FETCH_CONVERSATIONS
}

interface FetchUsersSuccessAction {
    type: ConversationsActionsTypes.FETCH_CONVERSATIONS_SUCCESS
    payload: IConversation[]
}

interface FetchUsersErrorAction {
    type: ConversationsActionsTypes.FETCH_CONVERSATIONS_ERROR
    payload: string
}

export type ConversationsAction =
    FetchUsersAction | FetchUsersSuccessAction | FetchUsersErrorAction
