import { FC, useState } from 'react'
import classes from './Header.module.scss'
import { useTypedSelector } from 'shared/store/hooks/useTypedSelector'
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import Menu, { StageType } from './Menu/Menu'
import { useUpdateHeader } from 'app/providers/AppRouter/hooks/useUpdateHeader'

interface HeaderProps {
    className?: string
}

const Header: FC<HeaderProps> = props => {
    const { title, showMenu } = useTypedSelector(store => store.page)
    const { user } = useTypedSelector(state => state.user)

    useUpdateHeader()

    const navigate = useNavigate()

    const pathname = useLocation().pathname
    const pathLength = pathname.split('/').length

    const [menuState, setMenuState] = useState(StageType.HIDDEN as StageType)

    const goBack = () => {
        navigate(pathname.split('/').slice(0, -1).join('/'))
    }

    const toggleMenu = () => {
        if (menuState === 'hidden') {
            setMenuState(StageType.OPENING)
        } else if (menuState === 'open') {
            setMenuState(StageType.HIDING)
        }
    }

    if (!showMenu || !user.isActivated) {
        return
    }

    return (
        <div className={[props.className, classes.header].join(' ')}>
            <div className={[props.className, classes.headerBar].join(' ')}>
                <div className={classes.titleBox}>
                    {pathLength > 3
                        ? <FontAwesomeIcon
                                icon={faChevronLeft}
                                className={classes.arrow}
                                onClick={goBack}
                        />
                        : null
                    }
                    <div
                        className={classes.title}
                    >
                        {title}
                    </div>
                </div>
                <div
                    className={classes.ellipsisBox}
                    onClick={toggleMenu}
                >
                    <FontAwesomeIcon
                        icon={faEllipsisV}
                        className={classes.ellipsis}
                    />
                </div>
            </div>
            <Menu stage={menuState} setStage={setMenuState} />
        </div>
    )
}

export default Header
