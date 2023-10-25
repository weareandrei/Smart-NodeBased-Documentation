import {NAVIGATE_TO_NODE} from "@/navigation/action";

export const SELECT_NODE = 'SELECT_NODE'
export const UPDATE_NODE = 'UPDATE_NODE'

export const selectNode = (node) => ({
    type: SELECT_NODE,
    node: node,
})

export const updateNode = (node) => ({
    type: UPDATE_NODE,
    node: node,
})
