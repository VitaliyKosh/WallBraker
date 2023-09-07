import { PageActionsTypes, PageState, PageAction } from '../../types/page'

const initialState: PageState = {
    path: '',
    title: '',
    showMenu: false
}

export const pageReducer = (state = initialState, action: PageAction): PageState => {
    switch (action.type) {
        case PageActionsTypes.SET_PAGE:
            return {
                ...state,
                path: action.payload.path,
                title: action.payload.title,
                showMenu: action.payload.showMenu
            }

            case PageActionsTypes.SET_TITLE:
                return {
                    ...state,
                    title: action.payload
                }

        default:
            return state
    }
}
