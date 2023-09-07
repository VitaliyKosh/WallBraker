import React, { FC } from 'react'
import classes from './PasswordInputs.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Input, { ThemeInput } from 'shared/ui/Input/Input'
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons'
import { classNames } from 'shared/lib/classNames/classNames'
import { Sign, useSign } from 'pages/LoginPage/providers/SignProvider'

interface PasswordInputsProps {
    className?: string
    pass: string
    setPass: (value: string) => void
    passConfirm: string
    setPassConfirm: (value: string) => void
    confirm: boolean
}

const PasswordInputs: FC<PasswordInputsProps> = props => {
    const { sign } = useSign()

    return (
        <>
            <div className={classes.inputBox}>
                {props.pass.length > 0
                    ? <FontAwesomeIcon
                            className={classNames(classes.icon, {}, [classes.lockIcon])}
                            icon={faUnlock}
                    />
                    : <FontAwesomeIcon
                            className={classNames(classes.icon, {}, [classes.lockIcon])}
                            icon={faLock}
                    />
                }
                <Input
                    className={classNames(classes.input, {}, [classes.password])}
                    type={'password'}
                    maxLength={32}
                    autoComplete={sign === Sign.LOGIN ? 'current-password' : 'new-password'}
                    theme={ThemeInput.CLEAR}
                    value={props.pass}
                    onChange={e => { props.setPass(e.target.value) }}
                    placeholder='Пароль'
                />
            </div>
            {props.confirm &&
                <div className={classes.inputBox}>
                    {props.pass.length > 0
                        ? <FontAwesomeIcon
                                className={classNames(classes.icon, {}, [classes.lockIcon])}
                                icon={faUnlock}
                        />
                        : <FontAwesomeIcon
                                className={classNames(classes.icon, {}, [classes.lockIcon])}
                                icon={faLock}
                        />
                    }
                    <Input
                        className={classNames(classes.input, {}, [classes.password])}
                        type={'password'}
                        maxLength={32}
                        autoComplete={'new-password'}
                        theme={ThemeInput.CLEAR}
                        value={props.passConfirm}
                        onChange={e => { props.setPassConfirm(e.target.value) }}
                        placeholder='Подтвердите пароль'
                    />
                </div>
            }
        </>
    )
}

export default PasswordInputs
