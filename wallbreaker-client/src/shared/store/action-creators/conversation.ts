import { Dispatch } from 'react'
import { ConversationAction, ConversationActionsTypes, Message } from '../../types/conversation'
import MessageService from 'shared/services/MessageService'
import ConversationService from 'shared/services/ConversationService'

export const getConversation = (id: string) => {
    return async (dispatch: Dispatch<ConversationAction>) => {
        try {
            dispatch({
                type: ConversationActionsTypes.SET_CONVERSATION_ID,
                payload: id
            })

            dispatch({ type: ConversationActionsTypes.FETCH_ALL_PARTICIPANTS })
            const resParticipants = await ConversationService.getAllParticipants(id)

            dispatch({
                type: ConversationActionsTypes.FETCH_ALL_PARTICIPANTS_SUCCESS,
                payload: resParticipants.data.participants
            })

            dispatch({ type: ConversationActionsTypes.FETCH_ALL_MESSAGES })
            const resMessages = await MessageService.getAllMessages(id)

            dispatch({
                type: ConversationActionsTypes.FETCH_ALL_MESSAGES_SUCCESS,
                payload: resMessages.data.messages
            })
        } catch (e) {
            dispatch({
                type: ConversationActionsTypes.FETCH_ALL_MESSAGES_ERROR,
                payload: 'Ошибка при загрузке диалога'
            })
            console.log(e)
        }
    }
}

export const newMessage = (message: Message) => {
    return async (dispatch: Dispatch<ConversationAction>) => {
        dispatch({
            type: ConversationActionsTypes.NEW_MESSAGE,
            payload: message
        })
    }
}
