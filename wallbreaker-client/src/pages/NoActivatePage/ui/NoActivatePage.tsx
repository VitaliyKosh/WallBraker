import React, { FC } from 'react'
import classes from './NoActivatePage.module.scss'
import { useTypedSelector } from 'shared/store/hooks/useTypedSelector'
import Button from 'shared/ui/Button/Button'
import { useActions } from 'shared/store/hooks/useActions'

interface NoActivatePageProps {
    className?: string
}

const NoActivatePage: FC<NoActivatePageProps> = props => {
    const { user } = useTypedSelector(state => state.user)
    const { logout } = useActions()

    return (
        <div className={classes.noActivatePage}>
            <div className={classes.noActivatePageBg} />
            <div className={classes.noActivatePageContainer} >
                <div className={classes.text}>
                    На почту {user.email} было отправлено письмо для подтверждения регистрации
                </div>
                <div className={classes.sendAgain}>
                    Отправить повторно
                </div>
                <Button onClick={logout}>Выйти</Button>
            </div>
        </div>
    )
}

export default NoActivatePage
