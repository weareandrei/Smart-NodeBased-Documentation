import {
    SELECT_NODE,
    SELECT_PARENT_NODE,
    REGISTER_NODE_UPDATE,
    SYNCING_NODES,
    SYNCING_NODES_SUCCESS,
    SYNCING_NODES_FAIL,
    LOADING_DOCUMENTATION,
    LOADED_DOCUMENTATION,
    LOADED_DOCUMENTATION_FAIL, SELECT_PROJECT
} from './action'

const MAX_NODE_LEVELS_DISPLAYED = 3

import flatMap from 'lodash/flatMap'
import filter from 'lodash/filter'
import get from 'lodash/get'
import includes from 'lodash/includes'
import find from "lodash/find"

const initialState = {
    documentation: {},
    selectedProject: {},
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
                selectedNodeChildren: getAllChildren(state.documentation.nodes, action.node, true)
            }
        case SELECT_PARENT_NODE:
            const parentNode = findParentNode(state.documentation.nodes, state.selectedNode)
            return parentNode === undefined ? {
                ...state,
                selectedNode: null,
                selectedNodeChildren: getProjectNodes(state.documentation.nodes, state.selectedProject.id)
            } : {
               ...state,
               selectedNode: parentNode,
               selectedNodeChildren: getAllChildren(state.documentation.nodes, parentNode, true)
            }
        case SELECT_PROJECT:
            return {
                ...state,
                selectedProject: find(state.documentation.projects, (project) => project.id === action.projectId),
                selectedNode: null,
                selectedNodeChildren: getProjectNodes(state.documentation.nodes, action.projectId)
            }
        case LOADING_DOCUMENTATION:
            return {
                ...state,
            }
        case LOADED_DOCUMENTATION:
            return {
                ...state,
                documentation: action.documentation,
                selectedProject: action.documentation.projects[0]
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

const findParentNode = (allNodes, node) => {
    const nodeId = node.id

    return find(allNodes, (node) => {
        const nodesChildren = get(node, 'children', [])
        if (nodesChildren.includes(nodeId)) {
            // then this is not an initial node
            return true
        }
    })
}

const getAllChildren = (allNodes, node=null, initial=false) => {
    const allChildren = []

    if (get(node, 'children', []).length > 0) {
        const currentNodeChildrenIds = node.children
        const currentNodeChildren = filter(allNodes, (node) => includes(currentNodeChildrenIds, node.id))

        if (!initial) {
            console.log('is not initial, pushing', node.id)
            allChildren.push(node)
        }

        allChildren.push(...flatMap(currentNodeChildren, (nodeChild) => getAllChildren(allNodes, nodeChild)))
        return allChildren
    }

    if (initial) {
        return []
    }

    console.log('is not initial, pushing', node.id)
    return node
}

const getProjectNodes = (allNodes, projectId) =>
    filter(allNodes, (node) => node.projectId === projectId)

export default documentationReducer
