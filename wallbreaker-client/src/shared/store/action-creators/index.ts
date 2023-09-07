import * as UserActionCreators from './user'
import * as PageActionCreators from './page'
import * as ConversationsActionCreators from './conversations'
import * as ConversationActionCreators from './conversation'
import * as AdminUsersActionCreators from './adminUsers'

export default {
    ...UserActionCreators,
    ...PageActionCreators,
    ...ConversationsActionCreators,
    ...ConversationActionCreators,
    ...AdminUsersActionCreators
}
