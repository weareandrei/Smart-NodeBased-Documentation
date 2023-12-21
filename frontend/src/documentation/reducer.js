import {
    SELECT_NODE,
    REGISTER_NODE_UPDATE,
    SYNCING_NODES,
    SYNCING_NODES_SUCCESS,
    SYNCING_NODES_FAIL,
    LOADING_DOCUMENTATION,
    LOADED_DOCUMENTATION,
    LOADED_DOCUMENTATION_FAIL
} from './action'

const MAX_NODE_LEVELS_DISPLAYED = 3

import flatMap from 'lodash/flatMap'
import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import includes from 'lodash/includes'

const initialState = {
    documentation: {},
    allNodes: [],
    selectedNode: null,
    selectedNodeChildren: [],
    documentationDepth: 0,
    syncInProgress: false,
    nodesSyncQueue: []
}

const documentationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_NODE:
            return {
                ...state,
                selectedNode: action.node,
                selectedNodeChildren: getAllChildren(state.documentation.doc, 1, MAX_NODE_LEVELS_DISPLAYED, action.node)
            }
        case LOADING_DOCUMENTATION:
            return {
                ...state,
            }
        case LOADED_DOCUMENTATION:
            return {
                ...state,
                documentation: action.documentation,
                allNodes: action.documentation.doc,
                selectedNodeChildren: getAllChildren(action.documentation.doc, 1, MAX_NODE_LEVELS_DISPLAYED)
            }
        case LOADED_DOCUMENTATION_FAIL:
            return {
                ...state,
            }
        case REGISTER_NODE_UPDATE:
            return {
                ...state,
                nodesSyncQueue: [...state.nodesSyncQueue, action.nodeUpdate]
            }
        case SYNCING_NODES:
            return {
                ...state,
                syncInProgress: true,
                nodesSyncingCurrently: state.nodesSyncQueue,
                nodesSyncQueue: []
            }
        case SYNCING_NODES_SUCCESS:
            return {
                ...state,
                syncInProgress: false,
                nodesSyncingCurrently: []
            }
        case SYNCING_NODES_FAIL:
            return {
                ...state,
                syncInProgress: false,
                nodesSyncQueue: state.nodesSyncingCurrently,
                nodesSyncingCurrently: []
            }
        default:
            return state
    }
}

const getAllChildren = (allNodes, currentLevel, maxLevel, node=null) => {
    const allChildren = []

    if (get(node, 'children', []).length > 0) {
        const currentNodeChildrenIds = node.children
        const currentNodeChildren = filter(allNodes, (node) => includes(currentNodeChildrenIds, node.id))

        if (currentLevel <= maxLevel) {
            allChildren.push(...flatMap(currentNodeChildren, (nodeChild) => getAllChildren(allNodes, nodeChild, currentLevel + 1, maxLevel)))
        } else {
            allChildren.push(currentNodeChildren)
        }

    }

    return allChildren
}

export default documentationReducer
