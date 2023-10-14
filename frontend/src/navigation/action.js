export const NAVIGATE_TO_PAGE = 'NAVIGATE_TO_PAGE'
export const NAVIGATE_TO_NODE = 'NAVIGATE_TO_PAGE'
export const UPDATE_NAV_HEIGHT = 'UPDATE_NAV_HEIGHT'

export {selectNode} from '../documentation/action'

export const navigateToPage = (page) => ({
    type: NAVIGATE_TO_PAGE,
    payload: page,
})

export const updateNavHeight = () => ({
    type: UPDATE_NAV_HEIGHT
})
