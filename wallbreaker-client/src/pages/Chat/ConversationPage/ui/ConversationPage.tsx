import { FC, useEffect } from 'react'
import classes from './ConversationPage.module.scss'
import { useParams } from 'react-router-dom'
import { useActions } from 'shared/store/hooks/useActions'
import { MessagesBlock } from 'widgets/Chat/MessagesBlock'
import { TextBox } from 'widgets/Chat/TextBox'
import { useTypedSelector } from 'shared/store/hooks/useTypedSelector'

interface ConversationPageProps {
    className?: string
}

const ConversationPage: FC<ConversationPageProps> = props => {
    const { id } = useParams()

    const { getConversation, setTitle } = useActions()
    const { participants } = useTypedSelector(s => s.conversation)
    const { user } = useTypedSelector(s => s.user)

    useEffect(() => {
        getConversation(id)
    }, [])

    useEffect(() => {
        if (participants) {
            setTitle(participants.filter(p => p.id !== user.id).map(p => {
                return p.username ?? p.email
            }).join(', '))
        }
    }, [participants])

    return (
        <div className={classes.conversationPage}>
            <MessagesBlock />
            <TextBox />
        </div>
    )
}

export default ConversationPage
