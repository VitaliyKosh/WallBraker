import {
    ConversationsAction,
    ConversationsActionsTypes,
    ConversationsState,
    IConversation
} from 'shared/types/conversations'

const initialState: ConversationsState = {
    conversations: [] as IConversation[],
    loading: false,
    error: null
}

export const conversationsReducer = (
    state = initialState,
    action: ConversationsAction
): ConversationsState => {
    switch (action.type) {
        case ConversationsActionsTypes.FETCH_CONVERSATIONS:
            return { ...state, loading: true }
        case ConversationsActionsTypes.FETCH_CONVERSATIONS_SUCCESS:
            return { ...state, loading: false, conversations: action.payload }
        case ConversationsActionsTypes.FETCH_CONVERSATIONS_ERROR:
            return { ...state, loading: false, error: action.payload }

        default:
            return state
    }
}
