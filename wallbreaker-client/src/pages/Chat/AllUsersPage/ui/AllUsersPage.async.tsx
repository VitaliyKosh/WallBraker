import { lazy } from 'react'

export const AllUsersPageAsync = lazy(async () => await import('./AllUsersPage'))
