import {NAVIGATE_TO_PAGE, NAVIGATE_TO_NODE, UPDATE_NAV_HEIGHT} from './action'

const initialState = {
    currentPage: 'Main',
    navigationHeight: 55
}

const navigationReducer = (state = initialState, action) => {
    switch (action.type) {
        case NAVIGATE_TO_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            }
        case NAVIGATE_TO_NODE:
            return {
                ...state,
                currentPage: action.payload,
            }
        case UPDATE_NAV_HEIGHT: {
            return {
                ...state,
                navigationHeight: getNavigationHeight(),
            }
        }

        default:
            return state
    }
}

const getNavigationHeight = () => {
    const navigationComponent = document.getElementById('navigationBar')
    const navHeight = navigationComponent ? navigationComponent.offsetHeight : 55
    return navHeight
}

export default navigationReducer
