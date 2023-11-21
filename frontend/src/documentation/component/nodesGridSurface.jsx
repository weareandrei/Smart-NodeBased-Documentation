import React, {Component} from 'react'
import PropTypes from 'prop-types'
import FlowComponent from './FlowComponent'
import map from 'lodash/map'
import get from 'lodash/get'
import flatMap from 'lodash/flatMap'

export default class NodesGridSurface extends Component {

    static propTypes = {
        nodes: PropTypes.array.isRequired,
        selectNode: PropTypes.func.isRequired,
        nodeModified: PropTypes.func.isRequired,
    }

    render() {
        return this.renderFlowComponent(
            this.createFlowNodes(this.props.nodes),
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

    createFlowNodes = (nodes) =>
        map(nodes, (node) => ({
            id: node.id,
            type: node.id === nodes[0].id ? 'current page' : node.type,
            data: {
                ...node
            },
            // position: node.position,
            position: { x: 400, y: 200 },
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
                type: 'smoothstep'
                // label: 'this is an edge label'
            }))
        )
}
