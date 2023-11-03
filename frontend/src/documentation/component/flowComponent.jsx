import React, { useCallback, useEffect } from 'react'
import PropTypes from "prop-types"
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,

} from 'reactflow'

import 'reactflow/dist/style.css'
import './overview.css'

// import { defaultNodes } from './initial-elements'

export default function FlowComponent(props) {
    const minimapStyle = {
        height: 120,
    }

    const [nodes, setNodes, onNodesChange] = useNodesState(props.nodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(props.edges)
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [])

    // Add an effect to update the state when the props change
    useEffect(() => {
        setNodes(props.nodes)
    }, [props.nodes])

    useEffect(() => {
        setEdges(props.edges)
    }, [props.edges])

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={() => {console.log(nodes)}}
            fitView
            style={{margin: '0.5rem'}}
        >
            <Background color="#aaa" gap={16} />
            <MiniMap style={minimapStyle} zoomable pannable />
            <Controls />
        </ReactFlow>
    )
}

FlowComponent.defaultProps = {
    nodes: [],
    edges: [],
}
