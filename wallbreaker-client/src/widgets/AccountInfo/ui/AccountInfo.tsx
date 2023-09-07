import { FC, useState } from 'react'
import classes from './AccountInfo.module.scss'
import { useTypedSelector } from 'shared/store/hooks/useTypedSelector'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUser,
    faEnvelope,
    faWallet,
    faRuble,
    faPen,
    faCheck,
    faXmark,
    faPlusCircle
} from '@fortawesome/free-solid-svg-icons'
import Input, { ThemeInput } from 'shared/ui/Input/Input'
import { useActions } from 'shared/store/hooks/useActions'
import { useNavigate } from 'react-router-dom'
import { privateRoutePath } from 'shared/config/routeConfig/routeConfig'

interface AccountInfoProps {
    className?: string
}

const AccountInfo: FC<AccountInfoProps> = props => {
    const { user } = useTypedSelector(s => s.user)

    const { setUsername } = useActions()
    const navigate = useNavigate()

    const { email, id, cash, username } = user

    const [usernameEdit, setUsernameEdit] = useState(username)
    const [isUsernameEdit, setIsUsernameEdit] = useState(false)

    const toggleUsernameEdit = () => {
        setUsernameEdit(username)
        setIsUsernameEdit(e => !e)
    }

    const saveUsername = () => {
        setUsername(usernameEdit)
        setIsUsernameEdit(false)
    }

    return (
        <div className={[props.className, classes.accountInfo].join(' ')}>
            <div className={classes.userInfo}>
                <div className={classes.avatarContainer}>
                    <div className={classes.avatarBox}>
                        <FontAwesomeIcon icon={faUser} className={classes.avatar}/>
                    </div>
                </div>
                <div className={classes.info}>
                    <div className={classes.email}>
                        <FontAwesomeIcon
                            icon={faEnvelope}
                            className={classes.icon}
                        />
                        {email}
                    </div>
                    <div className={classes.cash}>
                        <FontAwesomeIcon
                            icon={faWallet}
                            className={classes.icon}
                        />
                        <div className={classes.cashValue}>
                            {cash}
                            <FontAwesomeIcon
                                icon={faRuble}
                                className={classes.ruble}
                            />
                        </div>
                        <FontAwesomeIcon
                            icon={faPlusCircle}
                            className={classes.plus}
                            onClick={() => { navigate(privateRoutePath.CASH) }}
                        />
                    </div>
                </div>
            </div>
            <div>
                <div className={classes.username}>
                    {isUsernameEdit
                        ? <div className={classes.inputBox}>
                            <Input
                                theme={ThemeInput.CLEAR}
                                value={usernameEdit}
                                className={classes.usernameInput}
                                onChange={e => { setUsernameEdit(e.target.value) }}
                                maxLength={30}
                            />
                            <FontAwesomeIcon
                                icon={faXmark}
                                className={classes.xMark}
                                onClick={toggleUsernameEdit}
                            />
                        </div>
                        : <div
                                className={classes.usernameText}
                                onClick={toggleUsernameEdit}
                        >
                            {username || id}
                        </div>
                    }
                    {isUsernameEdit
                        ? <FontAwesomeIcon
                                icon={faCheck}
                                className={classes.check}
                                onClick={saveUsername}
                        />
                        : <FontAwesomeIcon
                                icon={faPen}
                                className={classes.edit}
                                onClick={toggleUsernameEdit}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default AccountInfo
