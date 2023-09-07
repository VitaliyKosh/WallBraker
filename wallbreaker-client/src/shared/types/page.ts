export interface PageState {
    path: string
    title: string
    showMenu: boolean | 1
}

export enum PageActionsTypes {
    SET_PAGE = 'SET_PAGE',
    SET_TITLE = 'SET_TITLE'
}

interface SetPageAction {
    type: PageActionsTypes.SET_PAGE
    payload: PageState
}

interface SetTitleAction {
    type: PageActionsTypes.SET_TITLE
    payload: string
}

export type PageAction = SetPageAction | SetTitleAction
