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
import map from "lodash/map";

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
                selectedNodeChildren: getSelectedNodeChildren(state.documentation.nodes, action.node, true)
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
               selectedNodeChildren: getSelectedNodeChildren(state.documentation.nodes, parentNode, true)
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
                documentation: {
                    ...action.documentation,
                    nodes: addParentData(action.documentation.nodes)
                },
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

const getSelectedNodeChildren = (allNodes, node=null, initial=false) => {
    const allChildren = []

    if (get(node, 'children', []).length > 0) {
        const currentNodeChildrenIds = node.children
        const currentNodeChildren = filter(allNodes, (node) => includes(currentNodeChildrenIds, node.id))

        if (!initial) {
            allChildren.push(node)
        }

        allChildren.push(...flatMap(currentNodeChildren, (nodeChild) => getSelectedNodeChildren(allNodes, nodeChild)))
        return allChildren
    }

    if (initial) {
        return []
    }

    return {...node, parent: findParentNode(allNodes, node).id}
}

const getProjectNodes = (allNodes, projectId) =>
    filter(allNodes, (node) => node.projectId === projectId)

const addParentData = (nodes) =>
    map(nodes, (node) => {
        const parentNode = findParentNode(nodes, node)
        if (parentNode === undefined) {
            return {...node, parent: null}
        }
        return {...node, parent: parentNode.id}
    })

export default documentationReducer
