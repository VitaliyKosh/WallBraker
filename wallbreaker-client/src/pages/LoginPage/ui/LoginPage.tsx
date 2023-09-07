import React, { FC, useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import classes from './LoginPage.module.scss'
import { LoginForm } from 'widgets/login/LoginForm'
import { Logo } from 'widgets/login/Logo'
import SignProvider from '../providers/SignProvider/ui/SignProvider'
import { NoOrHaveAccount } from 'widgets/login/NoOrHaveAccount/ui/NoOrHaveAccount'
import { Links } from 'widgets/login/Links'
import changeThemeColorMeta from 'app/providers/ThemeProvider/lib/changeThemeColorMeta'
import { Theme } from 'app/providers/ThemeProvider'
import { LOCAL_STORAGE_THEME_KEY } from '../providers/SignProvider/lib/SignContext'
import { useLoginStatusMenuColor } from 'shared/hooks/useLoginStatusMenuColor'

interface LoginPageProps {
    className?: string
    children?: React.ReactNode
}

const LoginPage: FC<LoginPageProps> = props => {
    useLoginStatusMenuColor()

    return (
        <div className={classNames(classes.loginPage)}>
            <div className={classes.loginPageGradient}/>
            <div className={classNames(classes.loginPageContainer)}>
                <SignProvider>
                    <Logo />
                    <LoginForm />
                    <div className={classes.links}>
                        <Links />
                        <NoOrHaveAccount />
                    </div>
                </SignProvider>
            </div>
        </div>
    )
}

export default LoginPage
