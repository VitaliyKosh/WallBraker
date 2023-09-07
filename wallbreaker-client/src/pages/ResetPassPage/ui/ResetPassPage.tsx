import { FC, useState } from 'react'
import classes from './ResetPassPage.module.scss'
import AuthService from 'shared/services/AuthService'
import { useParams } from 'react-router-dom'
import { Logo } from 'widgets/login/Logo'
import PasswordInputs from 'widgets/login/LoginForm/ui/PasswordInputs/PasswordInputs'
import SubmitButton from 'widgets/login/LoginForm/ui/SubmitButton/SubmitButton'
import { Links } from 'widgets/login/Links'
import { useLoginStatusMenuColor } from 'shared/hooks/useLoginStatusMenuColor'

interface ResetPassPageProps {
    className?: string
}

const ResetPassPage: FC<ResetPassPageProps> = props => {
    const [pass, setPass] = useState('')
    const [passConfirm, setPassConfirm] = useState('')
    const [reset, setReset] = useState(false)

    const { link } = useParams()
    useLoginStatusMenuColor()

    const resetPass = async () => {
        try {
            await AuthService.resetPassword(link, pass)
            setReset(true)
        } catch {

        }
    }

    return (
        <div className={[props.className, classes.resetPassPage].join(' ')}>
            <div className={classes.resetPassPageGradient}/>
            <div className={classes.resetPassPageContainer}>
                <Logo />
                {!reset
                    ? <>
                        <div className={classes.form}>
                            <div
                                className={classes.title}
                            >
                                Сброс пароля
                            </div>
                            <PasswordInputs
                                pass={pass}
                                setPass={setPass}
                                passConfirm={passConfirm}
                                setPassConfirm={setPassConfirm}
                                confirm={true} />
                            <SubmitButton onClick={resetPass}>Изменить пароль</SubmitButton>
                        </div>
                        <Links />
                    </>
                    : <div className={classes.form}>
                        <div
                            className={classes.title}
                        >
                            Пароль успешно сброшен
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ResetPassPage
