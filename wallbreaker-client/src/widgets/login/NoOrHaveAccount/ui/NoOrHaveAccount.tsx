import { FC, useEffect, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './NoOrHaveAccount.module.scss'
import { useSign } from 'pages/LoginPage/providers/SignProvider/lib/useSign'
import { Sign } from 'pages/LoginPage'

interface NoOrHaveAccountProps {
    className?: string
}

export const NoOrHaveAccount: FC<NoOrHaveAccountProps> = props => {
    const { className, ...otherProps } = props

    const { sign, setSign } = useSign()

    const [text, setText] = useState('')
    const [textLink, setTextLink] = useState('')

    useEffect(() => {
        const text = sign === Sign.LOGIN ? 'Еще нет аккаунта? ' : 'Уже зарегистрированы? '
        const textLink = sign === Sign.LOGIN ? 'Регистрация' : 'Войти'

        setText(text)
        setTextLink(textLink)
    }, [sign])

    if (sign === Sign.FORGET_DONE) {
        return
    }

    return (
        <div
            className={classNames(cls.noOrHaveAccount, {}, [className])}
            {...otherProps}
        >
            <span
                className={cls.text}
            >
                {text}
            </span>
            <span
                className={cls.link}
                onClick={() => { setSign(sign === Sign.LOGIN ? Sign.REGISTRATION : Sign.LOGIN) }}
            >
                {textLink}
            </span>
        </div>
    )
}
