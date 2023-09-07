import React, { FC } from 'react'
import classes from './NotificationsPage.module.scss'
import MenuButton from 'shared/ui/Menu/MenuButton/MenuButton'
import { faBell } from '@fortawesome/free-solid-svg-icons'

interface NotificationsPageProps {
    className?: string
}

const NotificationsPage: FC<NotificationsPageProps> = props => {
    const allowNotifications = (): void => {
        const displayConfirmNotification = () => {
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
        }

        displayConfirmNotification()
    }

    return (
        <div className={[props.className, classes.viewPage].join(' ')}>
            <MenuButton
                text={'Разрешить уведомления'}
                onClick={allowNotifications}
                icon={faBell}
            />
        </div>
    )
}

export default NotificationsPage
