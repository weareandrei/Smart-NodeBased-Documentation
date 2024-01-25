import {
    LOADED_DOCUMENTATION,
    LOADED_DOCUMENTATION_FAIL,
    LOADING_DOCUMENTATION,
    REGISTER_NODE_UPDATE,
    SELECT_NODE,
    SELECT_PARENT_NODE,
    SELECT_PROJECT,
    SYNCING_NODES,
    SYNCING_NODES_FAIL,
    SYNCING_NODES_SUCCESS
} from './action'
import flatMap from 'lodash/flatMap'
import filter from 'lodash/filter'
import get from 'lodash/get'
import includes from 'lodash/includes'
import find from "lodash/find"
import map from "lodash/map"

const MAX_NODE_LEVELS_DISPLAYED = 3

const initialState = {
    documentation: {},
    selectedProject: {},
    selectedNode: null,
    selectedNodeChildren: [],
    documentationDepth: 0,

    syncInProgress: false,
    nodesSyncQueue: {
        create: [],
        update: []
    }
    // nodesSyncQueue_example: [
    //     {
    //         id: '11',
    //         updates: [
    //             {type: 'position', value: '{x: 1300, y: 544}'},
    //             {type: 'value', title: 'Market value of Microsoft'}
    //         ]
    //     }
    // ]
}

const applyNodeUpdate = (nodes, id, update) => {
    switch (update.type) {
        case 'position':
            return map(nodes, (node) => {
                if (node.id === id) {
                    return {
                        ...node,
                        layoutAttributes: {
                            ...get(node, 'layoutAttributes', {}),
                            position: update.value
                        }
                    }
                }
                return node
            })
        case 'lock':
            return map(nodes, (node) => {
                if (node.id === id) {
                    return {
                        ...node,
                        layoutAttributes: {
                            ...get(node, 'layoutAttributes', {}),
                            locked: update.value
                        }
                    }
                }
                return node
            })
        case 'content':
            return map(nodes, (node) => {
                if (node.id === id) {
                    return {
                        ...node,
                        content: update.value
                    }
                }
                return node
            })
        default:
            return nodes
    }
}

const replaceOutdatedNodes = (allNodes, updatedNodes) =>
    map(allNodes, (oldNode) => {
        const foundUpdatedNode = find(updatedNodes, (updatedNode) => updatedNode.id === oldNode.id)
        return foundUpdatedNode === undefined ? oldNode : foundUpdatedNode
    })


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
                selectedProject: action.documentation.projects[0],
                selectedNode: null,
                selectedNodeChildren: getProjectNodes(action.documentation.nodes, action.documentation.projects[0].id)
            }
        case LOADED_DOCUMENTATION_FAIL:
            return {
                ...state,
            }
        case REGISTER_NODE_UPDATE:
            console.log('REGISTER_NODE_UPDATE', action.id)
            const updatedNodes = applyNodeUpdate(state.selectedNodeChildren, action.id, action.update)
            const allNodes = replaceOutdatedNodes(state.documentation.nodes, updatedNodes)
            return {
                ...state,
                documentation: {
                    ...state.documentation,
                    nodes: allNodes
                },
                selectedNodeChildren: updatedNodes,
                nodesSyncQueue: {
                    create: state.nodesSyncQueue.create,
                    update: appendNodeUpdateQueue(state.nodesSyncQueue.update, action.id, action.update)
                }
            }
        case SYNCING_NODES:
            return {
                ...state,
                syncInProgress: true,
                nodesSyncingCurrently: state.nodesSyncQueue,
                nodesSyncQueue: {
                    create: [],
                    update: []
                }
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

const appendNodeUpdateQueue = (updateQueue, id, update) => {
    // 1. Check if id already exists in nodeSyncQueue
    const existingNodeUpdateRecord = findRecentNodeUpdate(updateQueue, id)

    // 2. Create a new item not recent is found
    if (existingNodeUpdateRecord === undefined) {
        const newItem = {
            id: id,
            updates: [
                update
            ]
        }

        return [...updateQueue, newItem]
    }

    // 3. Replace the existing record in the queue
    const updatedRecord = addNewUpdateRecordToExistingId(existingNodeUpdateRecord, update)

    // 4. Return the updated queue
    const newQ = flatMap(updateQueue, (item) => (item.id === id ? updatedRecord : item))
    return newQ
}

const addNewUpdateRecordToExistingId = (record, update) => {
    const updateExists = find(record.updates, (existingUpdate) => existingUpdate.type === update.type)

    if (updateExists === undefined) {
        return {
            id: record.id,
            updates: [
                ...record.updates,
                update
            ]
        }
    }


    const modifiedRecord = {
        id: record.id,
        updates:
            map(record.updates, (existingUpdate) => {
                if (existingUpdate.type === update.type) {
                    return {
                        type: existingUpdate.type,
                        value: update.value
                    }
                }
                return existingUpdate
            })
    }


    return modifiedRecord

}

const getNodeById = (nodes, id) =>
    find(nodes, (node) => node.id === id)

const findRecentNodeUpdate = (nodeSyncQueue, id) =>
    find(nodeSyncQueue, (item) => item.id === id.toString())

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

const getProjectNodes = (allNodes, projectId) => {
    // console.log('getProjectNodes')
    // console.log('  allNodes', allNodes)
    // console.log('  projectId', projectId)
    return filter(allNodes, (node) => node.projectId === projectId)
}


const addParentData = (nodes) =>
    map(nodes, (node) => {
        const parentNode = findParentNode(nodes, node)
        if (parentNode === undefined) {
            return {...node, parent: null}
        }
        return {...node, parent: parentNode.id}
    })

export default documentationReducer
