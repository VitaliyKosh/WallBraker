import AccountTypes from 'shared/types/AccountTypes'
import { IUser } from 'shared/types/user'

export function isUserAdmin(user: IUser) {
    return user.accountType === AccountTypes.ADMIN || user.accountType === AccountTypes.MAIN_ADMIN
}
