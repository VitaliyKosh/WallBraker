import { IParticipant } from './participant'

/* eslint-disable max-len */
export interface Message {
    id: string
    conversationId: string
    senderId: string
    timeCreated: Date
    text: string
    attachmentId: string
}

export interface ConversationState {
    id: string | undefined
    messages: Message[]
    participants: IParticipant[]
    loading: boolean
    error: string | null
}

export enum ConversationActionsTypes {
    SET_CONVERSATION_ID = 'SET_CONVERSATION_ID',

    FETCH_ALL_PARTICIPANTS = 'FETCH_ALL_PARTICIPANTS',
    FETCH_ALL_PARTICIPANTS_SUCCESS = 'FETCH_ALL_PARTICIPANTS_SUCCESS',
    FETCH_ALL_PARTICIPANTS_ERROR = 'FETCH_ALL_PARTICIPANTS_ERROR',

    FETCH_ALL_MESSAGES = 'FETCH_ALL_MESSAGES',
    FETCH_ALL_MESSAGES_SUCCESS = 'FETCH_ALL_MESSAGES_SUCCESS',
    FETCH_ALL_MESSAGES_ERROR = 'FETCH_ALL_MESSAGES_ERROR',

    NEW_MESSAGE = 'NEW_MESSAGE'
}

interface SetConversationIdAction {
    type: ConversationActionsTypes.SET_CONVERSATION_ID
    payload: string
}

interface FetchAllParticipantsAction {
    type: ConversationActionsTypes.FETCH_ALL_PARTICIPANTS
}

interface FetchAllParticipantsSuccessAction {
    type: ConversationActionsTypes.FETCH_ALL_PARTICIPANTS_SUCCESS
    payload: IParticipant[]
}

interface FetchAllParticipantsErrorAction {
    type: ConversationActionsTypes.FETCH_ALL_PARTICIPANTS_ERROR
    payload: string
}

interface FetchAllMessagesAction {
    type: ConversationActionsTypes.FETCH_ALL_MESSAGES
}

interface FetchAllMessagesSuccessAction {
    type: ConversationActionsTypes.FETCH_ALL_MESSAGES_SUCCESS
    payload: Message[]
}

interface FetchAllMessagesErrorAction {
    type: ConversationActionsTypes.FETCH_ALL_MESSAGES_ERROR
    payload: string
}

interface NewMessageAction {
    type: ConversationActionsTypes.NEW_MESSAGE
    payload: Message
}

export type ConversationAction =
    SetConversationIdAction |
    FetchAllParticipantsAction | FetchAllParticipantsSuccessAction | FetchAllParticipantsErrorAction |
    FetchAllMessagesAction | FetchAllMessagesSuccessAction | FetchAllMessagesErrorAction |
    NewMessageAction
