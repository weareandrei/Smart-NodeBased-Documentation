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
    selectedNode: {},
    displayedNodes: [],
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
                displayedNodes: getAllChildren(state.documentation.doc, action.node, 1, MAX_NODE_LEVELS_DISPLAYED)
            }
        case LOADING_DOCUMENTATION:
            return {
                ...state,
            }
        case LOADED_DOCUMENTATION:
            return {
                ...state,
                selectedNode: action.selectedNode,
                documentation: action.documentation,
                displayedNodes: getAllChildren(action.documentation.doc, action.selectedNode, 1, MAX_NODE_LEVELS_DISPLAYED)
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

const getAllChildren = (allNodes, currentNode, currentLevel, maxLevel) => {
    const allChildren = []
    allChildren.push(currentNode)

    console.log('getAllChildren')
    console.log(allNodes)
    console.log(currentNode)
    console.log('\n\n')

    if (!get(currentNode, 'children', false) || !isEmpty(currentNode.children)) {
        const currentNodeChildrenIds = currentNode.children
        const currentNodeChildren = filter(allNodes, (node) => includes(currentNodeChildrenIds, node.id))

        if (currentLevel <= maxLevel) {
            allChildren.push(...flatMap(currentNodeChildren, (nodeChild) => getAllChildren(allNodes, nodeChild, currentLevel + 1, maxLevel)))
        } else {
            allChildren.push(currentNodeChildren)
        }

    }

    console.log('getAllChildren result: ', allChildren)
    return allChildren
}

export default documentationReducer
