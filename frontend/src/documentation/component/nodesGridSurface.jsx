import React, {Component} from 'react'
import PropTypes from 'prop-types'
import FlowComponent from './FlowComponent'
import map from 'lodash/map'
import get from 'lodash/get'
import flatMap from 'lodash/flatMap'
import isEqual from 'lodash/isEqual'

import NodesLayout from '../util/nodesLayout'
import find from "lodash/find";

export default class NodesGridSurface extends Component {

    static propTypes = {
        nodes: PropTypes.array.isRequired,
        selectNode: PropTypes.func.isRequired,
        nodeModified: PropTypes.func.isRequired,
    }
    static defaultProps = {
        selectedNode: null
    }

    // state = {
    //     // reload: false,
    //     nodesDisplayed: []
    // }

    render() {
        // this.updateDisplayedNodes(this.props.nodes)

        const nodesLayout = new NodesLayout(this.props.nodes)
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
                    nodeModified={this.props.nodeModified}
                />
            </div>
        )
    }

    createFlowNodes = (nodes, nodesLayout) =>
        map(nodes, (node) => ({
            id: node.id,
            type: node.id === nodes[0].id ? 'current page' : node.type,
            data: {
                ...node,
                type: node.id === nodes[0].id ? 'current page' : node.type,
                isChild: this.isChild(node),
                isParent: this.isParent(node)
            },
            position: nodesLayout.getNodeCoordinates(node.id)
            // position: find(nodesPositions, (nodePosition) => nodePosition.id === node.id),
            // style: {
            //     // ...node.size
            // }
        }))

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
