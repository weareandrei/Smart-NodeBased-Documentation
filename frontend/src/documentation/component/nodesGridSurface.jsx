import React, { useCallback } from 'react'
import PropTypes from "prop-types"
import FlowComponent from './FlowComponent'
import map from "lodash/map"

export default class NodesGridSurface extends React.Component {

    static propTypes = {
        nodes: PropTypes.array.isRequired,
        selectNode: PropTypes.func.isRequired,
        updateNode: PropTypes.func.isRequired
    }

    static defaultProps = {}

    render() {
        const flowNodes = this.createFlowNodes(this.props.nodes)
        // const flowEdges = createFlowEdges(this.props.nodes)

        return (
            <FlowComponent initialNodes={flowNodes}
                           initialEdges={[]}/>
        )
    }

    createFlowNodes = (nodes) =>
        map(nodes, (node) => ({
            id: node.id,
            type: 'default',
            data: {
                label: node.title,

            },
            position: {x: 100 * node.id, y: 100}
        }))

}
