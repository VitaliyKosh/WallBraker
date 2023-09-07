import React, { useEffect, type FC } from 'react'
import classes from './AllUsersPage.module.scss'
import { useActions } from 'shared/store/hooks/useActions'
import { useTypedSelector } from 'shared/store/hooks/useTypedSelector'
import MenuAdminUser from 'shared/ui/Menu/MenuAdminUser/MenuAdminUser'
import MenuContainer from 'shared/ui/Menu/MenuContainer/MenuContainer'

interface AllUsersPageProps {
    className?: string
    children?: React.ReactNode
}

const AllUsersPage: FC<AllUsersPageProps> = props => {
    const { getAllAdminUsers } = useActions()

    const { users } = useTypedSelector(s => s.adminUsers)

    useEffect(() => {
        getAllAdminUsers()
    }, [])

    return (
        <div className={classes.allUsersPage}>
            <MenuContainer>
                {users.map(user => <MenuAdminUser key={user.id} user={user}/>)}
            </MenuContainer>
        </div>
    )
}

export default AllUsersPage
