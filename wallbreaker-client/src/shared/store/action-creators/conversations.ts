import { Dispatch } from 'react'
import ConversationService from 'shared/services/ConversationService'
import { ConversationsAction, ConversationsActionsTypes } from 'shared/types/conversations'

export const getAllConversations = () => {
    return async (dispatch: Dispatch<ConversationsAction>) => {
        try {
            dispatch({ type: ConversationsActionsTypes.FETCH_CONVERSATIONS })

            const response = await ConversationService.getAllConversations()

            dispatch({
                type: ConversationsActionsTypes.FETCH_CONVERSATIONS_SUCCESS,
                payload: response.data.conversations
            })
        } catch (e) {
            dispatch({
                type: ConversationsActionsTypes.FETCH_CONVERSATIONS_ERROR,
                payload: 'Ошибка при загрузке диалогов'
            })
            console.log(e)
        }
    }
}
