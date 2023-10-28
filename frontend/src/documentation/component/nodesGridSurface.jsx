import React, { useCallback } from 'react'
import PropTypes from "prop-types"
import loadable from '@loadable/component'

import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
} from 'reactflow'

// const ReactFlow = loadable(() => import('reactflow'), {
//     modules: ['react-flow'],
// });

import { nodes as initialNodes, edges as initialEdges } from './initial-elements'

export default class NodesGridSurface extends React.Component {

    static propTypes = {
        nodes: PropTypes.array.isRequired,
        selectNode: PropTypes.func.isRequired,
        updateNode: PropTypes.func.isRequired,
        minimapStyle: PropTypes.object.isRequired
    }

    static defaultProps = {
        minimapStyle: {height: 120}
    }

    render() {
        const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
        const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
        const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

        // we are using a bit of a shortcut here to adjust the edge type
        // this could also be done with a custom edge for example
        const edgesWithUpdatedTypes = edges.map((edge) => {
            if (edge.sourceHandle) {
                const edgeType = nodes.find((node) => node.type === 'custom').data.selects[edge.sourceHandle]
                edge.type = edgeType
            }

            return edge
        })

        return (
            <ReactFlow
                nodes={nodes}
                edges={edgesWithUpdatedTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={this.onInit}
                fitView
                attributionPosition="top-right"
                nodeTypes={{}}
            >
                <MiniMap style={this.props.minimapStyle} zoomable pannable />
                <Controls />
                <Background color="#aaa" gap={16} />
            </ReactFlow>
        )
    }

    onInit = (reactFlowInstance) =>
        console.log('flow loaded:', reactFlowInstance)

}