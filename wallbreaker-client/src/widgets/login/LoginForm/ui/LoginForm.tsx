import React, { FC, useEffect, useState } from 'react'
import classes from './LoginForm.module.scss'
import Input, { ThemeInput } from 'shared/ui/Input/Input'
import SubmitButton from './SubmitButton/SubmitButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faEnvelope,
    faEnvelopeOpen,
    faWarning
} from '@fortawesome/free-solid-svg-icons'
import request from 'axios'
import { classNames } from 'shared/lib/classNames/classNames'
import { Sign, useSign } from 'pages/LoginPage/providers/SignProvider'
import AuthService from 'shared/services/AuthService'
import { useActions } from 'shared/store/hooks/useActions'
import PasswordInputs from './PasswordInputs/PasswordInputs'
import { useErrors } from '../hooks/useErrors'
import validatePass from '../lib/validatePass'
import { useTypedSelector } from 'shared/store/hooks/useTypedSelector'

interface LoginFormProps {
    className?: string
}

const LoginForm: FC<LoginFormProps> = props => {
    const { sign, setSign } = useSign()

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [passConfirm, setPassConfirm] = useState('')

    const { login } = useActions()
    const user = useTypedSelector(state => state.user)

    const {
        addError,
        removeError,
        errorText,
        setErrorText,
        errorTypes,
        setErrorTypes
    } = useErrors()

    useEffect(() => {
        if (user.error) {
            setErrorText(() => user.error)
        }
    }, [user.error, user.loading])

    const clickSubmit = async () => {
        if (errorTypes.length > 0) return
        if (sign === Sign.REGISTRATION && pass !== passConfirm) return

        if (sign === Sign.LOGIN) {
            login(email, pass)
        } else if (sign === Sign.REGISTRATION) {
            try {
                await AuthService.registration(email, pass)
                login(email, pass)
            } catch (e) {
                if (request.isAxiosError(e) && e.response) {
                    setErrorText(e.response.data.message)
                } else {
                    setErrorText('Ошибка сервера')
                }
            }
        } else if (sign === Sign.FORGET) {
            try {
                if (email.length < 1) {
                    setErrorText('Введите e-mail')
                    return
                }
                await AuthService.resetPasswordRequest(email)
                setSign(Sign.FORGET_DONE)
            } catch (e) {
                if (request.isAxiosError(e) && e.response) {
                    setErrorText(e.response.data.message)
                } else {
                    setErrorText('Ошибка сервера')
                }
            }
        }
    }

    useEffect(() => {
        setErrorTypes([])
        setErrorText('')
        setPassConfirm('')
        setPass('')
    }, [sign])

    useEffect(() => {
        if (sign === Sign.REGISTRATION) {
            const valResult = validatePass(pass, passConfirm)
            if (valResult.add) {
                addError(valResult.errorType)
            } else {
                removeError(valResult.errorType)
            }
        }
    }, [pass, passConfirm])

    if (sign === Sign.FORGET_DONE) {
        return (
            <div className={[props.className, classes.loginForm].join(' ')}>
                <div className={classes.infoBox}>
                    {`На почту ${email} отправлено письмо с информацией`}
                </div>
                <div className={classes.buttonBox}>
                    <SubmitButton
                        onClick={() => { setSign(Sign.LOGIN) }}
                    >
                        Войти
                    </SubmitButton>
                </div>
            </div>
        )
    }

    return (
        <div className={[props.className, classes.loginForm].join(' ')}>
            <div className={classes.inputBox}>
                {email.length > 0
                    ? <FontAwesomeIcon
                            icon={faEnvelopeOpen}
                            className={classNames(classes.icon, {}, [classes.openMail])}
                    />
                    : <FontAwesomeIcon className={classes.icon} icon={faEnvelope}/>
                }
                <Input
                    className={classNames(classes.input, {}, [])}
                    // theme={ThemeInput.CLEAR}
                    value={email}
                    onChange={e => { setEmail(e.target.value) }}
                    placeholder='Email'
                />
            </div>
            {sign !== Sign.FORGET &&
                <PasswordInputs
                    pass={pass}
                    setPass={setPass}
                    passConfirm={passConfirm}
                    setPassConfirm={setPassConfirm}
                    confirm={sign === Sign.REGISTRATION}
                />
            }
            <div className={classes.buttonAndForgetBox}>
                <div className={classes.buttonBox}>
                    <SubmitButton
                        onClick={clickSubmit}
                    />
                </div>
                {sign === Sign.LOGIN &&
                    <div
                        className={classes.forgetMessage}
                        onClick={() => { setSign(Sign.FORGET) }}
                    >
                        Забыли пароль?
                    </div>
                }
                <div
                    className={[
                        classes.warning,
                        sign === Sign.LOGIN ? classes.loginWarning : ''
                    ].join(' ')}
                >
                    {errorText.length > 0
                        ? <div>
                            <FontAwesomeIcon
                                icon={faWarning}
                                className={classNames(classes.warningIcon)}
                            />
                            {errorText}
                        </div>
                        : undefined
                    }
                </div>
            </div>
        </div>
    )
}

export default LoginForm
