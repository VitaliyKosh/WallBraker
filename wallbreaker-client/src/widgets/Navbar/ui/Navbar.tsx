import React, { FC, useEffect, useState } from 'react'
import classes from './Navbar.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUser,
    faCartShopping,
    faGear,
    faQuestionCircle,
    faComment,
    IconDefinition
} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { PrivateAppRoutes, privateRoutePath } from 'shared/config/routeConfig/routeConfig'
import { useTypedSelector } from 'shared/store/hooks/useTypedSelector'
import isIOS from 'shared/lib/device/isIOS'

interface NavbarProps {
    className?: string
    children?: React.ReactNode
}

interface IIcon {
    icon: IconDefinition
    routePath: PrivateAppRoutes
}

const icons: IIcon[] = [
    {
        icon: faQuestionCircle,
        routePath: PrivateAppRoutes.INSTRUCTION
    }, {
        icon: faCartShopping,
        routePath: PrivateAppRoutes.SHOP
    }, {
        icon: faUser,
        routePath: PrivateAppRoutes.MAIN
    }, {
        icon: faComment,
        routePath: PrivateAppRoutes.CHAT
    }, {
        icon: faGear,
        routePath: PrivateAppRoutes.SETTINGS
    }
]

const Navbar: FC<NavbarProps> = props => {
    const navigate = useNavigate()

    const { path, showMenu } = useTypedSelector(store => store.page)
    const { user } = useTypedSelector(state => state.user)

    const [ios, setIos] = useState(false)

    useEffect(() => {
        const iOS = isIOS()
        setIos(iOS)
    }, [])

    if (showMenu !== true || !user.isActivated) {
        return
    }

    return (
        <div className={[props.className, classes.navbar].join(' ')}>
            {icons.map(icon => {
                return (
                    <div
                        className={[classes.iconBox, ios ? classes.ios : ''].join(' ')}
                        key={icon.routePath}
                    >
                        <FontAwesomeIcon
                            icon={icon.icon}
                            className={[
                                classes.icon,
                                path.split('/')[2] ===
                                privateRoutePath[icon.routePath].split('/')[2]
                                ? classes.active
                                : ''
                            ].join(' ')}
                            onClick={() => {
                                navigate(privateRoutePath[icon.routePath])
                            }}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default Navbar
