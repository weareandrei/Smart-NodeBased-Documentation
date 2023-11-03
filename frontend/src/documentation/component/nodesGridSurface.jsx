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
        updateNode: PropTypes.func.isRequired,
    }

    render() {
        return this.renderFlowComponent(
            this.createFlowNodes(this.props.nodes),
            this.createFlowEdges(this.props.nodes)
        )
    }

    renderFlowComponent = (nodes, edges) => {
        console.log(nodes)
        console.log(edges)

        return (
            <div className="h-full w-full p-2">
                <FlowComponent
                    nodes={nodes}
                    edges={edges}
                    // className="h-full w-full"
                    // style={{margin: '0.5rem'}}
                />
            </div>
        )
    }


    createFlowNodes = (nodes) =>
        map(nodes, (node) => ({
            id: node.id,
            data: {
                label: node.title,
            },
            position: { x: 150 * node.id, y: 150 * node.id },
        }))

    createFlowEdges = (nodes) =>
        flatMap(nodes, (node) =>
            map(get(node, 'children', []), (child) => ({
                id: 'e'+node.id+'-'+child.id,
                source: node.id,
                target: child.id,
                type: 'smoothstep',
                label: 'this is an edge label'
            }))
        )
}
