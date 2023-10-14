import {SELECT_NODE} from './action'

const initialState = {
    selectedNode: {},
    documentationDepth: 0
}

const documentationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_NODE:
            console.log('SELECT_NODE')
            return {
                ...state,
                selectedNode: action.node,
            }

        default:
            return state
    }
}

export default documentationReducer
