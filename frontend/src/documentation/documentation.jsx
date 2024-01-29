import React, {Component} from 'react'
import PropTypes from "prop-types"
import {connect} from 'react-redux'
import {withCookies} from "react-cookie"
import {withRouter} from "react-router-dom"
import {withMediaQuery} from "../common/media"

import flatMap from "lodash/flatMap"
import map from "lodash/map"
import get from "lodash/get"
import find from "lodash/find"

import { buildNodeUpdateObject } from './registerUpdate'
import FlowComponent from "./component/flowComponent"
import NodesLayout from "./util/nodesLayout"

import * as actions from './action'

class Documentation extends Component {

    static propTypes = {
        nodesSyncQueue: PropTypes.object.isRequired,
        registerNodeUpdate: PropTypes.func.isRequired,
        registerNodeCreate: PropTypes.func.isRequired,
        syncNodes: PropTypes.func.isRequired,

        // documentation props
        documentation: PropTypes.object.isRequired,
        selectNode: PropTypes.func.isRequired,
        selectedNode: PropTypes.object,
        selectedNodeChildren: PropTypes.array.isRequired
    }

    state = {
        nodesSizes: [],
        autoLayoutActivated: false
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.autoLayoutActivated && this.state.autoLayoutActivated) {
            // console.log('\n ------- autoLayoutActivated: false')
            this.setState({ autoLayoutActivated: false })
        }
    }

    render() {
        return (
            <div style={{height: '100vh', paddingLeft: '300px', background: '#F7F5FA'}}>
                {this.renderNodesGridSurface()}
            </div>
        )
    }

    renderNodesGridSurface = () => {
        const nodesLayout = new NodesLayout(this.props.selectedNodeChildren, this.state.nodesSizes)
        nodesLayout.buildLayout()

        const nodes = this.createFlowNodes(this.props.selectedNodeChildren, nodesLayout)
        const edges = this.createFlowEdges(this.props.selectedNodeChildren)

        return (
            <div className="h-full w-full p-2">
                <FlowComponent
                    nodes={nodes}
                    edges={edges}
                    performNodeUpdate={this.performNodeUpdate}
                    autoLayoutActivated={this.autoLayoutActivated}
                    registerNodesSizes={this.registerNodesSizes}
                />
            </div>
        )
    }

    autoLayoutActivated = () => {
        this.setState({ autoLayoutActivated: true })
    }

    performNodeUpdate = (update) => {
        console.log('performNodeUpdate, update:', update)
        const updateObject = buildNodeUpdateObject(update)
        console.log('updateObject:', updateObject)

        if (updateObject !== undefined) {
            this.props.registerNodeUpdate(updateObject)
            this.props.syncNodes()
        }
    }

    createFlowNodes = (nodes, nodesLayout) =>
        map(nodes, (node) => ({
            id: node.id,
            type: /*node.id === nodes[0].id ? 'current page' :*/ node.type,
            data: {
                ...node,
                isChild: this.isChild(node),
                isParent: this.isParent(node),
                performNodeUpdate: this.performNodeUpdate,
                createNewNode: this.createNewNode
            },
            position: this.getNodePosition(node, nodesLayout),
            draggable: !get(node, 'layoutAttributes.locked', false)
            // style: {
            //     // ...node.size
            // }
        }))

    createNewNode = (fromNode) => {
        this.registerNodeCreate(fromNode)
    }

    createFlowEdges = (nodes) =>
        flatMap(nodes, (node) =>
            map(get(node, 'children', []), (childId) => ({
                id: 'e'+node.id+'-'+childId,
                source: node.id,
                target: childId,
                type: 'smoothstep',
                style:{strokeWidth:3}
                // label: 'this is an edge label'
            }))
        )

    registerNodesSizes = (nodesSizes) => {
        if (this.sizesChanged(this.state.nodesSizes, nodesSizes)) {
            this.setState({ nodesSizes: nodesSizes })
        }
    }

    sizesChanged = (oldSizes, newSizes) => {
        if (oldSizes.length === 0 && newSizes.length !== 0) {
            return true
        }

        const foundUpdatedSize = find(oldSizes, (oldSize) => {
            const oldId = oldSize.id
            const sameIdNewSize = find(newSizes, (newSize) => newSize.id === oldId)
            if ((sameIdNewSize === undefined) /* id's do not correspond, hence new directory was selected */ ||
                (sameIdNewSize.height !== oldSize.height || sameIdNewSize.width !== oldSize.width)) {
                return true
            }
        })

        if (foundUpdatedSize !== undefined) {
            return true
        }
        return false
    }

    getNodePosition = (thisNode, nodesLayout) => {
        // console.log('\n')
        // console.log('thisNode.id =', thisNode.id)
        if (this.state.autoLayoutActivated) {
            // If node's movement is not locked then give it auto-layout
            if (!get(thisNode, 'layoutAttributes.locked', false)) {
                // console.log('-- auto + not locked')
                const nodeCoordinates = nodesLayout.getNodeCoordinates(thisNode.id)
                this.performNodeUpdate({id: thisNode.id, type: 'position', autoLayout: true, position: nodeCoordinates})
                return nodeCoordinates
            }
        }

        // In all the other case do : if position given - use position, otherwise auto
        if (get(thisNode, 'layoutAttributes.position', false)) {
            // console.log('-- existing position')
            return thisNode.layoutAttributes.position
        }

        const nodeCoordinates = nodesLayout.getNodeCoordinates(thisNode.id)
        // console.log('-- auto + non-existent position')
        this.performNodeUpdate({id: thisNode.id, type: 'position', autoLayout: true, position: nodeCoordinates})
        return nodeCoordinates
    }

    isParent = (node) => {
        const childrenFound = get(node, 'children', undefined)
        if (childrenFound === undefined) {
            return false
        } return true
    }

    isChild = (node) => {
        const nodeId = node.id
        const parentFound = find(this.props.selectedNodeChildren, (node) => get(node, 'children', []).includes(nodeId))
        if (parentFound === undefined) {
            return false
        } return true
    }

}

export default connect((state) => ({
    nodesSyncQueue: state.documentation.nodesSyncQueue,

    // documentation
    documentation: state.documentation.documentation,
    selectedNode: state.documentation.selectedNode,
    selectNode: PropTypes.func.isRequired,
    selectedNodeChildren: state.documentation.selectedNodeChildren
}), actions)(withCookies(withRouter(withMediaQuery(Documentation))))
