import map from 'lodash/map'
import reduce from 'lodash/reduce'
import sortBy from 'lodash/sortBy'

import {
    VALIDATE_USER_CREDENTIALS,
    USER_CREDENTIALS_CORRECT,
    USER_CREDENTIALS_WRONG,
    USER_DATA_LOADED,
    SIGN_OUT
} from "./action"

const initialState = {
    authenticated : false,
    loading: true,
    userData: {}
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case VALIDATE_USER_CREDENTIALS:
            return {
                ...state,
                loading: true
            }
        case USER_CREDENTIALS_CORRECT:
            return {
                ...state,
                authenticated: true,
                loading: false
            }
        case USER_CREDENTIALS_WRONG:
            return {
                ...state,
                authenticated: false,
                loading: false
            }
        case USER_DATA_LOADED:
            return {
                ...state,
                userData: action.data,
                loading: false
            }
        case SIGN_OUT:
            return {
                ...initialState
            }
        default:
            return state
    }
}

export default authReducer
