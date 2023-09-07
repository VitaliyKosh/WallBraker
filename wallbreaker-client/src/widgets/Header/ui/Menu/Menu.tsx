import { FC } from 'react'
import classes from './Menu.module.scss'
import { useActions } from 'shared/store/hooks/useActions'
import { faArrowRightFromBracket, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import MenuButton, { IMenuButton } from 'shared/ui/Menu/MenuButton/MenuButton'

export enum StageType {
    OPENING = 'opening',
    OPEN = 'open',
    HIDING = 'hiding',
    HIDDEN = 'hidden'
}

interface MenuProps {
    className?: string
    stage: StageType
    setStage: (stage: StageType) => void
}

const Menu: FC<MenuProps> = props => {
    const { logout } = useActions()

    const menuItems: IMenuButton[] = [
        {
            text: 'Обновить экран',
            icon: faRotateRight,
            onClick: () => { location.reload() }
        }, {
            text: 'Выйти',
            icon: faArrowRightFromBracket,
            onClick: logout
        }
    ]

    const onAnimationEnd = () => {
        if (props.stage === StageType.OPENING) {
            props.setStage(StageType.OPEN)
        } else if (props.stage === StageType.HIDING) {
            props.setStage(StageType.HIDDEN)
        }
    }

    const bgClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) props.setStage(StageType.HIDING)
    }

    if (props.stage === StageType.HIDDEN) return

    return (
        <>
            <div
                className={[
                    props.className,
                    classes.menuBox,
                    classes[`menuBox-${props.stage}`]
                ].join(' ')}
                onClick={bgClickHandler}
                id='menu'
            >
            </div>
            <div
                className={[classes.menu, classes[props.stage]].join(' ')}
                onAnimationEnd={onAnimationEnd}
            >
                {menuItems.map(item => (
                    <MenuButton
                        key={item.text}
                        text={item.text}
                        icon={item.icon}
                        onClick={item.onClick}
                    />
                ))}
            </div>
        </>
    )
}

export default Menu
