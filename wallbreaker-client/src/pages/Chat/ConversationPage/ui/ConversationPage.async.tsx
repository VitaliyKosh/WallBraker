import { lazy } from 'react'

export const ConversationPageAsync = lazy(async () => await import('./ConversationPage'))
