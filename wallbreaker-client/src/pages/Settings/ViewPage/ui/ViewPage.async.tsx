import { lazy } from 'react'

export const ViewPageAsync = lazy(async () => await import('./ViewPage'))
