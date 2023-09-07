import React, { FC } from 'react'
import classes from './SubmitButton.module.scss'
import Button, { ThemeButton } from 'shared/ui/Button/Button'
import { Sign } from 'pages/LoginPage'
import { useSign } from 'pages/LoginPage/providers/SignProvider/lib/useSign'

interface SubmitButtonProps {
    className?: string
    children?: React.ReactNode
    onClick: () => void
}

const SubmitTypeText: Record<Sign, string> = {
    [Sign.LOGIN]: 'Войти',
    [Sign.REGISTRATION]: 'Зарегистрироваться',
    [Sign.FORGET]: 'Восстановить пароль',
    [Sign.FORGET_DONE]: 'Отправлено письмо'
}

const SubmitButton: FC<SubmitButtonProps> = props => {
    const { sign } = useSign()

    return (
        <Button
            theme={ThemeButton.CLEAR}
            className={classes.submitButton}
            onClick={props.onClick}
        >
            {props.children !== undefined ? props.children : SubmitTypeText[sign]}
        </Button>
    )
}

export default SubmitButton
