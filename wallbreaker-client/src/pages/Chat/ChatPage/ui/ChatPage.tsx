import React, { useEffect, type FC } from 'react'
import classes from './ChatPage.module.scss'
import { useActions } from 'shared/store/hooks/useActions'
import { useTypedSelector } from 'shared/store/hooks/useTypedSelector'
import MenuContainer from 'shared/ui/Menu/MenuContainer/MenuContainer'
import MenuConversation from 'shared/ui/Menu/MenuConversation/MenuConversation'
import MenuAllUsers from 'shared/ui/Menu/MenuAllUsers/MenuAllUsers'
import { isUserAdmin } from 'shared/helpers/isUserAdmin'
import
    MenuUserFirstConversation
from 'shared/ui/Menu/MenuUserFirstConversation/MenuUserFirstConversation'

interface ChatPageProps {
    className?: string
    children?: React.ReactNode
}

const ChatPage: FC<ChatPageProps> = props => {
    const { getAllConversations } = useActions()

    const { conversations } = useTypedSelector(s => s.conversations)
    const { user } = useTypedSelector(s => s.user)

    useEffect(() => {
        getAllConversations()
    }, [])

    return (
        <div className={classes.chatPage}>
            <MenuContainer>
                {isUserAdmin(user) && <MenuAllUsers />}
                {conversations.length > 0
                ? conversations.map(conversation =>
                    <MenuConversation
                        key={conversation.id}
                        conversation={conversation}
                    />
                )
                : !isUserAdmin(user) && <MenuUserFirstConversation/>
                }
            </MenuContainer>
        </div>
    )
}

export default ChatPage
