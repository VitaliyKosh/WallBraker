import { useActions } from './../../../../shared/store/hooks/useActions'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
    AdminAppRoutes,
    AppRoutes,
    PrivateAppRoutes,
    adminRouteConfig,
    privateRouteConfig,
    routeConfig
} from 'shared/config/routeConfig/routeConfig'
import { useTypedSelector } from 'shared/store/hooks/useTypedSelector'

export function useUpdateHeader() {
    const user = useTypedSelector(state => state.user)
    const pathname = useLocation().pathname

    const { setPage } = useActions()

    const comparePaths = (path: string, currentPath: string) => {
        if (path.endsWith('/:id')) {
            const pathWithoutId = path.split('/:id')[0]
            return pathWithoutId === currentPath.split('/').slice(0, -1).join('/')
        } else {
            return path === pathname
        }
    }

    const updateHeader = () => {
        let page

        if (user.auth) {
            const privateKeys = (Object.keys(privateRouteConfig) as PrivateAppRoutes[])
            const adminKeys = (Object.keys(adminRouteConfig) as AdminAppRoutes[])

            page = privateRouteConfig[privateKeys.find(k => {
                return comparePaths(privateRouteConfig[k].path, pathname)
            })] ??
            adminRouteConfig[adminKeys.find(k => {
                return comparePaths(adminRouteConfig[k].path, pathname)
            })]
        } else {
            const publicKeys = (Object.keys(routeConfig) as AppRoutes[])
            page = routeConfig[publicKeys.find(k => {
                return comparePaths(routeConfig[k].path, pathname)
            })]
        }

        if (!page) return

        setPage({
            path: page.path,
            title: page.title,
            showMenu: page.showMenu
        })
    }

    useEffect(() => {
        updateHeader()
    }, [pathname, user.auth])
}
