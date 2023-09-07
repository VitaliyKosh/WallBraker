import {
    ConversationActionsTypes,
    ConversationState,
    ConversationAction
} from '../../types/conversation'

const initialState: ConversationState = {
    id: undefined,
    messages: [],
    participants: [],
    loading: false,
    error: null
}

export const conversationReducer = (
    state = initialState,
    action: ConversationAction
): ConversationState => {
    switch (action.type) {
        case ConversationActionsTypes.SET_CONVERSATION_ID:
            return { ...state, id: action.payload }

        case ConversationActionsTypes.FETCH_ALL_PARTICIPANTS:
            return { ...state, loading: true }
        case ConversationActionsTypes.FETCH_ALL_PARTICIPANTS_SUCCESS:
            return { ...state, loading: false, participants: action.payload }
        case ConversationActionsTypes.FETCH_ALL_PARTICIPANTS_ERROR:
            return { ...state, loading: false, error: action.payload }

        case ConversationActionsTypes.FETCH_ALL_MESSAGES:
            return { ...state, loading: true }
        case ConversationActionsTypes.FETCH_ALL_MESSAGES_SUCCESS:
            return { ...state, loading: false, messages: action.payload }
        case ConversationActionsTypes.FETCH_ALL_MESSAGES_ERROR:
            return { ...state, loading: false, error: action.payload }

        case ConversationActionsTypes.NEW_MESSAGE:
            return { ...state, messages: [action.payload, ...state.messages] }

        default:
            return state
    }
}
