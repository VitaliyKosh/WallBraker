import { Dispatch } from 'react'
import { PageAction, PageActionsTypes, PageState } from 'shared/types/page'

export const setPage = (page: PageState) => {
    return async (dispatch: Dispatch<PageAction>) => {
        dispatch({ type: PageActionsTypes.SET_PAGE, payload: page })
    }
}

export const setTitle = (title: string) => {
    return async (dispatch: Dispatch<PageAction>) => {
        dispatch({ type: PageActionsTypes.SET_TITLE, payload: title })
    }
}
