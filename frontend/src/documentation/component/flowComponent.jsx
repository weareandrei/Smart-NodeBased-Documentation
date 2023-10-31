import React, { useCallback } from 'react'
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
} from 'reactflow'

import 'reactflow/dist/style.css';
import './overview.css';

const minimapStyle = {
    height: 120,
}

const nodeTypes = {}

const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance)

const FlowComponent = ({initialNodes,  initialEdges}) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [])

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={onInit}
            fitView
            attributionPosition="top-right"
        >
            {/*<Background color="#aaa" gap={16} />*/}
            <MiniMap style={minimapStyle} zoomable pannable />
            {/*<Controls />*/}
        </ReactFlow>
    )
}

export default FlowComponent
