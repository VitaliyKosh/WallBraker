import { FC, PropsWithChildren, createContext, useEffect, useMemo, useState } from 'react'
import { WS } from 'shared/lib/ws'
import { useActions } from 'shared/store/hooks/useActions'

export const WSContext = createContext<WS>(null)

const WsProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ws, setWs] = useState<WS>(new WS())

    const wsProps = useMemo(() => (ws), [ws])

    const { newMessage } = useActions()

    ws.setOnMessageCb((message) => {
        newMessage(message.message)
        if ('serviceWorker' in navigator) {
            const options: NotificationOptions = {
                body: 'You successfully subscribed to our Notification service!',
                icon: '/icons/apple-touch-icon_120.png',
                image: '/icons/apple-touch-icon_120.png',
                dir: 'ltr',
                lang: 'en-US',
                badge: '/icons/apple-touch-icon_120.png',
                tag: 'confirm-notification',
                actions: [
                    {
                        action: 'confirm',
                        title: 'Okay',
                        icon: '/icons/apple-touch-icon_120.png'
                    },
                    {
                        action: 'cancel',
                        title: 'Cancel',
                        icon: '/icons/apple-touch-icon_120.png'

                    }
                ]
            }
            // eslint-disable-next-line max-len
            navigator.serviceWorker.ready.then(async sw => { await sw.showNotification('Successfully subscribed!', options) })
        }
    })

    return (
        <WSContext.Provider value={wsProps}>
            {children}
        </WSContext.Provider>
    )
}

export default WsProvider
