import {NAVIGATE_TO_NODE} from "../navigation/action"
import find from "lodash/find"

export const SELECT_NODE = 'SELECT_NODE'
export const REGISTER_NODE_UPDATE = 'REGISTER_NODE_UPDATE'
export const REGISTER_NODE_CREATE = 'REGISTER_NODE_UPDATE'
export const SYNCING_NODES = 'SYNCING_NODES'
export const SYNCING_NODES_SUCCESS = 'SYNCING_NODES_SUCCESS'
export const SYNCING_NODES_FAIL = 'SYNCING_NODES_FAIL'
export const LOADING_DOCUMENTATION = 'LOADING_DOCUMENTATION'
export const LOADED_DOCUMENTATION = 'LOADED_DOCUMENTATION'
export const LOADED_DOCUMENTATION_FAIL = 'LOADED_DOCUMENTATION_FAIL'

export const selectNode = (node) => ({
    type: SELECT_NODE,
    node: node
})

const findNodeWithIdZero = (nodes) =>
    find(nodes, (node) => node.id === '0')

export const registerNodeUpdate = (documentation, node) => ({
    type: REGISTER_NODE_UPDATE,
    nodeUpdate: {
        action: 'update',
        node: prepareNodeUpdate(
            documentation,
            node
        )
    }
})

const prepareNodeUpdate = (documentation, node) => {
    const updates = {
        nodeId: node.id,
        updateValues: {
            'doc.$.title': node.data.label,
            'doc.$.size': {
                width: node.width,
                height: node.height
            },
            'doc.$.position': node.position
        }
    }

    console.log('----- Prepared Node Update : ', updates)
    return updates
}

export const registerNodeCreate = (documentation, node, parentId) => ({
    type: REGISTER_NODE_CREATE,
    nodeUpdate: {
        action: 'create',
        parentId: parentId,
        node: prepareNodeCreate(
            documentation,
            node
        )
    }
})

const prepareNodeCreate = (documentation, node) => {
    const updates = {
        updateValues: {
            'id': node.id,
            'title': node.data.label,
            'size': {
                width: node.width,
                height: node.height
            },
            'position': node.position
        }
    }

    console.log('----- Prepared Node Create : ', updates)
    return updates
}

const findNodePath = (node, nodeId, currentPath = '') => {
    if (node.id === nodeId) {
        return currentPath
    }

    if (node.children && Array.isArray(node.children)) {
        for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i]
            const childPath = currentPath + '.children.$[' + i + ']'

            const result = findNodePath(child, nodeId, childPath)
            if (result) {
                return currentPath + result
            }
        }
    }

    return null
}

const syncingNodes = () => ({
    type: SYNCING_NODES
})

const syncingNodesSuccess = (response) => ({
    type: SYNCING_NODES_SUCCESS
})

const syncingNodesFail = (response) => ({
    type: SYNCING_NODES_FAIL
})

export const syncNodes = () => {
    return (dispatch, getState) => {
        // Check if synchronization is already in progress
        if (getState().documentation.syncInProgress) {
            // If sync is in progress, return a Promise that resolves when sync completes
            return new Promise((resolve) => {
                const checkSync = () => {
                    if (!getState().documentation.syncInProgress) {
                        resolve();
                    } else {
                        setTimeout(checkSync, 100); // Check again after a short delay
                    }
                };
                checkSync();
            })
        } else {
            const updates = getState().documentation.nodesSyncQueue
            dispatch(syncingNodes());

            return fetch('http://localhost:8081/syncNodes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    documentationId: '6523592fd730e1f9120fbef6',
                    nodeUpdates: updates
                }),
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw response
                    }
                })
                .then((data) => {
                    dispatch(syncingNodesSuccess(data))
                })
                .catch((error) => {
                    dispatch(syncingNodesFail(error))
                    throw error
                })
        }
    }
}

const loadingDocumentation = () => ({
    type: LOADING_DOCUMENTATION
})

const loadedDocumentation = (response, node) => ({
    type: LOADED_DOCUMENTATION,
    documentation: response,
    selectedNode: node
})

const loadedDocumentationFail = () => ({
    type: LOADED_DOCUMENTATION_FAIL
})

export const loadDocumentation = (documentationId) => {
    return (dispatch) => {
        dispatch(loadingDocumentation())

        fetch(`http://localhost:8081/loadDocumentation?documentationId=${documentationId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        // dispatch(selectNode(findNodeWithIdZero(data.doc)))
                        dispatch(loadedDocumentation(data, findNodeWithIdZero(data.doc)))
                    })
                } else {
                    console.log('error loading documentation, : ', response)
                    dispatch(loadedDocumentationFail())
                }
            })
            .catch((error) => {
                console.log('error loading documentation, : ', error)
                dispatch(loadedDocumentationFail())
            })
    }
}
