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

export default function FlowComponent(props) {
    const minimapStyle = {
        height: 120,
    }

    const [nodes, setNodes, onNodesChange] = useNodesState(props.nodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(props.edges)
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [])

    console.log('rendering FlowComponent for nodes: ', nodes)
    console.log('. . .and, props.nodes: ', props.nodes)

    // Add an effect to update the state when the props change
    // useEffect(() => {
    //     setNodes(props.nodes)
    // }, [props.nodes])
    useEffect(() => {
        onNodesChange(props.nodes)
    }, [props.nodes, onNodesChange])

    // useEffect(() => {
    //     setEdges(props.edges)
    // }, [props.edges])

    // useEffect(() => {
    //     // Call your updateNodes function with the updated nodes whenever nodes change
    //     props.updateNodes(nodes)
    // }, [nodes, props.updateNodes])

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={(newNodes) => {
                onNodesChange(newNodes)
            }}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeDragStop={(mouseEvent, node) => props.nodeModified(node)}
            // onElementClick={()=>console.log("onElementClick")}
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
