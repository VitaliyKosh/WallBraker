import { FC, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import classes from './AppRouter.module.scss'
import {
    adminRouteConfig,
    privateRouteConfig,
    routeConfig
} from 'shared/config/routeConfig/routeConfig'
import { useTypedSelector } from 'shared/store/hooks/useTypedSelector'
import { PageLoader } from 'widgets/PageLoader'
import { useTransitions } from '../hooks/useTransitions'
import NoActivatePage from 'pages/NoActivatePage/ui/NoActivatePage'

const AppRouter: FC = props => {
    const user = useTypedSelector(state => state.user)

    if (!user.authChecked) {
        return (<PageLoader/>)
    }

    if (user.auth && !user.user.isActivated) {
        return (
            <Suspense fallback={<PageLoader/>}>
                <div className={[classes.pageWrapper].join(' ')}>
                    <NoActivatePage />
                </div>
            </Suspense>
        )
    }

    if (user.auth) {
        return (
            <Suspense fallback={<PageLoader/>}>
                <div className={[classes.pageWrapper].join(' ')}>
                    <div
                        className={[
                            classes.pageContainer
                        ].join(' ')}
                    >
                        <Routes>
                            {[...Object.values(privateRouteConfig).map(({ element, path }) => {
                                return (
                                    <Route
                                        key={path}
                                        path={path}
                                        element={element}
                                    />
                                )
                            }),
                            ...Object.values(adminRouteConfig).map(({ element, path }) => {
                                return (
                                    <Route
                                        key={path}
                                        path={path}
                                        element={element}
                                    />
                                )
                            })]}
                            <Route
                                path="/app/*"
                                element={<Navigate to="/app/main" replace />}
                            />
                        </Routes>
                    </div>
                </div>
            </Suspense>
        )
    } else {
        return (
            <Routes>
                {Object.values(routeConfig).map(({ element, path }) => (
                    <Route
                        key={path}
                        path={path}
                        element={(
                            <div className={classes.pageWrapper}>
                                {element}
                            </div>
                            )}
                        />
                    ))}
                <Route
                    path="/app/*"
                    element={<Navigate to="/app" replace />}
                />
            </Routes>
        )
    }
}

export default AppRouter
