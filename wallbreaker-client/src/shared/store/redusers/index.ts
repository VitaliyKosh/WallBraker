import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { pageReducer } from './pageReducer'
import { conversationsReducer } from './conversationsReducer'
import { conversationReducer } from './conversationReducer'
import { adminUsersReducer } from './adminUsersReducer'

export const rootReducer = combineReducers({
    user: userReducer,
    page: pageReducer,
    conversations: conversationsReducer,
    conversation: conversationReducer,
    adminUsers: adminUsersReducer
})

export type RootState = ReturnType<typeof rootReducer>
