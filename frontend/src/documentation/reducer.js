import {SELECT_NODE, UPDATE_NODE} from './action'
const MAX_NODE_LEVELS_DISPLAYED = 3

import flatMap from 'lodash/flatMap'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

const initialState = {
    selectedNode: {},
    documentationDepth: 0
}

const documentationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_NODE:
            return {
                ...state,
                selectedNode: action.node,
                displayedNodes: getAllChildren(action.node, 1, MAX_NODE_LEVELS_DISPLAYED)
            }
        case UPDATE_NODE:
            return {
                ...state,
                selectedNode: action.node,
                displayedNodes: getAllChildren(action.node, 1, MAX_NODE_LEVELS_DISPLAYED)
            }

        default:
            return state
    }
}

const getAllChildren = (node, currentLevel, maxLevel) => {
    const childrenNodes = []
    if (currentLevel <= maxLevel) {
        if (!isEmpty(get(node, 'children', []))) {
            childrenNodes.push(flatMap(node.children, (childNode) =>([
                ...getAllChildren(childNode, currentLevel+1, maxLevel)
            ])))
        }
    }
    return flatMap([
        node,
        ...childrenNodes
    ])
}

export default documentationReducer
