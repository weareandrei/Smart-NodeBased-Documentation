import React, {Component} from 'react'
import PropTypes from 'prop-types'
import FlowComponent from './FlowComponent'
import map from 'lodash/map'
import get from 'lodash/get'
import flatMap from 'lodash/flatMap'
import isEqual from 'lodash/isEqual'

import NodesLayout from '../util/nodesLayout'
import find from "lodash/find"
import {registerNodeCreate} from "../action";

export default class NodesGridSurface extends Component {

    static propTypes = {
        nodes: PropTypes.array.isRequired,
        selectNode: PropTypes.func.isRequired,
        registerNodeUpdate: PropTypes.func.isRequired,
        registerNodeCreate: PropTypes.func.isRequired
    }

    static defaultProps = {
        selectedNode: null
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
        const nodesLayout = new NodesLayout(this.props.nodes, this.state.nodesSizes)
        nodesLayout.buildLayout()

        return this.renderFlowComponent(
            this.createFlowNodes(this.props.nodes, nodesLayout),
            this.createFlowEdges(this.props.nodes)
        )
    }

    renderFlowComponent = (nodes, edges) => {
        return (
            <div className="h-full w-full p-2">
                <FlowComponent
                    nodes={nodes}
                    edges={edges}
                    registerNodeUpdate={this.props.registerNodeUpdate}
                    autoLayoutActivated={this.autoLayoutActivated}
                    registerNodesSizes={this.registerNodesSizes}
                />
            </div>
        )
    }

    autoLayoutActivated = () => {
        this.setState({ autoLayoutActivated: true })
    }

    createFlowNodes = (nodes, nodesLayout) =>
        map(nodes, (node) => ({
            id: node.id,
            type: /*node.id === nodes[0].id ? 'current page' :*/ node.type,
            data: {
                ...node,
                isChild: this.isChild(node),
                isParent: this.isParent(node),
                registerNodeUpdate: this.props.registerNodeUpdate,
                createNewNode: this.createNewNode
            },
            position: this.getNodePosition(node, nodesLayout),
            draggable: !get(node, 'layoutAttributes.locked', false)
            // style: {
            //     // ...node.size
            // }
        }))

    createNewNode = (fromNode) => {
        this.props.registerNodeCreate(fromNode)
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
            if (sameIdNewSize.height !== oldSize.height || sameIdNewSize.width !== oldSize.width) {
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
                this.props.registerNodeUpdate({id: thisNode.id, type: 'position', autoLayout: true, position: nodeCoordinates})
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
        this.props.registerNodeUpdate({id: thisNode.id, type: 'position', autoLayout: true, position: nodeCoordinates})
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
        const parentFound = find(this.props.nodes, (node) => get(node, 'children', []).includes(nodeId))
        if (parentFound === undefined) {
            return false
        } return true
    }

}
